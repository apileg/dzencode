import { prisma } from "@/prisma"
import { NextApiHandler } from "next"
import { parseId } from "../_parseId"
import { Prisma } from "@prisma/client"

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

        try {
            await prisma.productEntity.delete({ where: { id } })
            res.status(200)
        } catch (error) {
            if (isDeleteNonExistentError(error)) {
                res.status(404)
                return
            }

            res.status(500)
            return
        }
    } finally {
        res.end()
    }
}

function isDeleteNonExistentError(error: any) {
    return (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === "P2025"
    )
}

export default handler
