
import { randomUUID } from "crypto"
import { FastifyInstance } from "fastify"
import { createWriteStream } from "fs"
import { extname, resolve } from "path"
import {pipeline} from 'node:stream'
import {promisify} from 'node:util'
import { folderFiles } from "../settings" 

const pump = promisify(pipeline)

export async function uploadRoutes(app: FastifyInstance){
    app.post('/upload', async (req, res) => {
        const file = await req.file({
            limits:{
                fileSize: 52428800 // 50MB
            }
        })

        if (!file) {
            return res.status(400).send()
        }

        const mimeTypeRegex = /^(image|video)\/[a-zA-Z]+/
        const validFile = mimeTypeRegex.test(file.mimetype)

        if (!validFile){
            return res.status(400).send({
                error: "invalid file type. Only accept Image and video formats"
            })
        }

        const fileId = randomUUID()
        const extension = extname(file.filename)
        const fileName = fileId.concat(extension)

        const writeStream = createWriteStream(
            resolve(__dirname, folderFiles, fileName)
        )

        await pump(file.file, writeStream)

        const fullUrl = req.protocol.concat('://').concat(req.hostname)
        const fileUrl = new URL(`/uploads/${fileName}`, fullUrl).toString()

        return {
            fileUrl
        }

    })
}