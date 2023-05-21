import axios from "axios"
import { FastifyInstance } from "fastify"
import { prisma } from "../lib/prisma"
import { bodySchema, userSchema } from "../schemas/auth"
import { GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET } from "../settings"

export async function authRoutes(app: FastifyInstance){
    app.post("/register", async (req) => {
        

        const {code} = bodySchema.parse(req.body)

        const accessToken = axios.post(
            "https://github.com/login/oauth/access_token",
            null,
            {
                params:{
                    client_id: GITHUB_CLIENT_ID,
                    client_secret: GITHUB_CLIENT_SECRET,
                    code
                },
                headers: {
                    Accept: 'application/json'
                }
            }
        )

        const {access_token} = (await accessToken).data
        const userData = await axios.get("https://api.github.com/user", {
            headers: {
                Authorization: `Bearer ${access_token}`
            }
        })
        const user_res = userSchema.parse(userData.data)

        let user = await prisma.user.findUnique({
            where: {
                githubId: user_res.id
            }
        })

        if (!user) {
            user = await prisma.user.create({
                data: {
                    githubId: user_res.id,
                    login: user_res.login,
                    name: user_res.name,
                    avatarUrl: user_res.avatar_url
                }
            })
        }

        const token = app.jwt.sign(
            {
                name: user.name,
                avatarUrl: user.avatarUrl
            }, 
            {
                sub: user.id,
                expiresIn: '30 days'
            }
        )


        return {
           token,
        }
    })
}