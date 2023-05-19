import { NextApiHandler } from "next"
import { prisma } from "@/prisma"
import { getProductTypes } from "@/dal/getProductTypes"

const handler: NextApiHandler = async (request, response) => {
    try {
        if (request.method !== "GET") {
            response.status(404)
            return
        }

        const types = await getProductTypes()
        response.json(types)
    } finally {
        response.end()
    }
}

export default handler
