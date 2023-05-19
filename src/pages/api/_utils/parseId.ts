import { NextApiRequest } from "next"
import { z } from "zod"

const idZod = z.number().int().positive()

export function parseId(request: NextApiRequest): number | null {
    const idString = request.query.id

    try {
        return idZod.parse(Number(idString))
    } catch {
        return null
    }
}
