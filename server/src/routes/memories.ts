import { FastifyInstance } from "fastify"
import { prisma } from "../lib/prisma"
import { bodySchema, paramsSchema } from "../schemas/memories"

export async function memoriesRoutes(app:FastifyInstance) {
    app.addHook('preHandler', async (req) => {
        await req.jwtVerify()
    })


    app.get("/memories", async (req) => {
        
        const memories = await prisma.memory.findMany({
            where: {
                userId: req.user.sub
            },
            orderBy: {
                createdAt: 'asc',
            }
        })

        return memories.map((memory) => {
            return {
                id: memory.id,
                coverUrl: memory.coverUrl,
                excerpt: memory.content.length <= 120 ? memory.content : memory.content.substring(0, 120).concat('...'),
                createdAt: memory.createdAt
            }
        })
    })

    app.get("/memories/:id", async (req, res) => {
        const { id } = paramsSchema.parse(req.params)

        const memory = await prisma.memory.findUniqueOrThrow({
            where: {
                id: id,
            }
        })

        if (!memory.isPublic && memory.userId !== req.user.sub){
            return res.status(401).send()
        }

        return memory
    })

    app.post("/memories", async (req) => {
        const {content, coverUrl, isPublic} = bodySchema.parse(req.body)

        const memory = await prisma.memory.create({
            data:{
                content,
                coverUrl,
                isPublic,
                userId: req.user.sub
            }
        })

        return memory
    })

    app.put("/memories/:id", async (req, res) => {
        const { id } = paramsSchema.parse(req.params)
        const {content, coverUrl, isPublic} = bodySchema.parse(req.body)

        let memory = await prisma.memory.findUniqueOrThrow({
            where: {
                id,
            }
        })

        if (memory.userId !== req.user.sub){
            return res.status(401).send()
        }


        memory = await prisma.memory.update({
            where: {
                id: id,
            },
            data: {
                content,
                coverUrl,
                isPublic
            }
        })

        return memory
    })


    app.delete("/memories/:id", async (req, res) => {
        const { id } = paramsSchema.parse(req.params)

        const memory = await prisma.memory.findUniqueOrThrow({
            where: {
                id,
            }
        })

        if (memory.userId !== req.user.sub){
            return res.status(401).send()
        }

        await prisma.memory.delete({
            where: {
                id: id,
            }
        })
    })
}