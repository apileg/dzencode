import { prisma } from "@/prisma"
import { NextApiHandler } from "next"
import { parseId } from "../_utils/parseId"
import { performDelete } from "../_utils/performDelete"

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

        await performDelete(res, () =>
            prisma.orderEntity.delete({ where: { id } })
        )
    } finally {
        res.end()
    }
}

export default handler
