import { NextApiHandler } from "next"
import { getUserFromJwtCookie } from "@/bll/jwt"
import { wrapHandler } from "./_utils/wrapHandler"

const handler: NextApiHandler = wrapHandler(async (request, response) => {
    if (request.method !== "GET") {
        return
    }

    const user = getUserFromJwtCookie(request)
    response.json(user)
})

export default handler
