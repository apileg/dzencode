import { prisma } from "@/prisma"
import { NextApiHandler } from "next"
import { parseId } from "../../_utils/parseId"

const handler: NextApiHandler = async (req, res) => {
    try {
        if (req.method !== "GET") {
            res.status(404)
            return
        }

        const id = parseId(req)

        if (id === null) {
            res.status(404)
            return
        }

        // Query 4
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
