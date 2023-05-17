import { prisma } from "@/db"
import { NextApiHandler } from "next"
import { z } from "zod"

const idZod = z.number().int().positive()

const handler: NextApiHandler = async (req, res) => {
    try {
        if (req.method !== "GET") {
            res.status(404)
            return
        }

        const idString = req.query.id
        let id

        try {
            id = idZod.parse(Number(idString))
        } catch {
            res.status(404)
            return
        }

        const products = await prisma.productEntity.findMany({
            where: {
                orderId: id,
            },
        })

        res.status(200).json(products)
    } finally {
        res.end()
    }
}

export default handler
