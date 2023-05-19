import { prisma } from "@/prisma"
import { NextApiHandler } from "next"
import { parseId } from "../../_utils/parseId"

const handler: NextApiHandler = async (request, response) => {
    try {
        if (request.method !== "GET") {
            response.status(404)
            return
        }

        const id = parseId(request)

        if (id === null) {
            response.status(404)
            return
        }

        // Query 4
        const products = await prisma.productEntity.findMany({
            where: {
                orderId: id,
            },
        })

        response.status(200).json(products)
    } finally {
        response.end()
    }
}

export default handler
