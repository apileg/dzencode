import { NextApiResponse } from "next"
import { Prisma } from "@prisma/client"

export async function performDelete(
    res: NextApiResponse,
    fn: () => Promise<any>
) {
    try {
        await fn()
        res.status(200)
    } catch (error) {
        if (isDeleteNonExistentError(error)) {
            res.status(404)
            return
        }

        res.status(500)
    }
}

function isDeleteNonExistentError(error: any) {
    return (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === "P2025"
    )
}
