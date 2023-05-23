import { NextApiHandler } from "next"
import { getProductTypes } from "@/dal/getProductTypes"
import { getUserFromJwtCookie } from "@/bll/jwt"
import { wrapHandler } from "../_utils/wrapHandler"

const handler: NextApiHandler = wrapHandler(async (request, response) => {
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
})

export default handler
