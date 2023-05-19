import { NextApiResponse } from "next"
import { Prisma } from "@prisma/client"

export async function performDelete(
    response: NextApiResponse,
    fn: () => Promise<any>
) {
    try {
        await fn()
        response.status(200)
    } catch (error) {
        if (isDeleteNonExistentError(error)) {
            response.status(404)
            return
        }

        response.status(500)
    }
}

function isDeleteNonExistentError(error: any) {
    return (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === "P2025"
    )
}
