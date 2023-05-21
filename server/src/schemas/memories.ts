import { z } from "zod";

export const paramsSchema = z.object({
    id: z.string().uuid(),
})

export const bodySchema = z.object({
    content: z.string(),
    coverUrl: z.string(),
    isPublic: z.coerce.boolean().default(false),
})