import { NextApiHandler } from "next"
import { getProductTypes } from "@/dal/getProductTypes"
import { getUserFromJwtCookie } from "@/bll/jwt"

const handler: NextApiHandler = async (request, response) => {
    try {
        if (request.method !== "GET") {
            response.status(404)
            return
        }

        const user = getUserFromJwtCookie(request)

        if (user === null) {
            response.status(500)
            return
        }

        const types = await getProductTypes(user.id)
        response.json(types)
    } finally {
        response.end()
    }
}

export default handler
