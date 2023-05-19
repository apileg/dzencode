import { prisma } from "@/prisma"
import { NextApiHandler } from "next"
import { parseId } from "../_utils/parseId"
import { performDelete } from "../_utils/performDelete"

const handler: NextApiHandler = async (request, response) => {
    try {
        if (request.method !== "DELETE") {
            response.status(404)
            return
        }

        const id = parseId(request)

        if (id === null) {
            response.status(404)
            return
        }

        await performDelete(response, () =>
            prisma.productEntity.delete({ where: { id } })
        )
    } finally {
        response.end()
    }
}

export default handler
