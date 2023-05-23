import { NextApiHandler } from "next"

export function wrapHandler(fn: NextApiHandler): NextApiHandler {
    return async (request, response) => {
        try {
            await fn(request, response)
        } catch (error) {
            console.dir(error)
            response.status(500)
        } finally {
            response.end()
        }
    }
}
