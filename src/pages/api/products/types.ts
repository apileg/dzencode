import { NextApiHandler } from "next"
import { prisma } from "@/prisma"

const handler: NextApiHandler = async (req, res) => {
    try {
        if (req.method !== "GET") {
            res.status(404)
            return
        }

        const rows = await prisma.productEntity.findMany({
            select: {
                type: true,
            },

            distinct: ["type"],
        })

        const types = rows.map((t) => t.type)
        res.json(types)
    } finally {
        res.end()
    }
}

export default handler
