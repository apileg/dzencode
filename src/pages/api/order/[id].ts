import { prisma } from "@/prisma"
import { NextApiHandler } from "next"
import { parseId } from "../_parseId"

const handler: NextApiHandler = async (req, res) => {
    try {
        if (req.method !== "DELETE") {
            res.status(404)
            return
        }

        const id = parseId(req)

        if (id === null) {
            res.status(404)
            return
        }

        await prisma.orderEntity.delete({ where: { id } })
        res.status(200)
    } finally {
        res.end()
    }
}

export default handler
