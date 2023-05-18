import { NextApiRequest } from "next"
import { z } from "zod"

const idZod = z.number().int().positive()

export function parseId(req: NextApiRequest): number | null {
    const idString = req.query.id

    try {
        return idZod.parse(Number(idString))
    } catch {
        return null
    }
}
