import { NextApiHandler } from "next"
import { getUserFromJwtCookie } from "@/bll/jwt"

const handler: NextApiHandler = async (request, response) => {
    try {
        if (request.method !== "GET") {
            return
        }

        const user = getUserFromJwtCookie(request)
        response.json(user)
    } finally {
        response.end()
    }
}

export default handler
