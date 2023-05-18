import { NextApiHandler } from "next"
import { prisma } from "@/prisma"
import { getProductTypes } from "@/dal/getProductTypes"

const handler: NextApiHandler = async (req, res) => {
    try {
        if (req.method !== "GET") {
            res.status(404)
            return
        }

        const types = await getProductTypes()
        res.json(types)
    } finally {
        res.end()
    }
}

export default handler
