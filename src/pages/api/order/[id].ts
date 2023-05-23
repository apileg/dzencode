import { getUserFromJwtCookie } from "@/bll/jwt"
import { deleteOrder } from "@/dal/deleteOrder"
import { doesUserOwnOrder } from "@/dal/doesUserOwnOrder"
import { NextApiHandler } from "next"
import { parseId } from "../_utils/parseId"
import { performDelete } from "../_utils/performDelete"
import { wrapHandler } from "../_utils/wrapHandler"

const handler: NextApiHandler = wrapHandler(async (request, response) => {
    if (request.method !== "DELETE") {
        response.status(404)
        return
    }

    const id = parseId(request)

    if (id === null) {
        response.status(404)
        return
    }

    const user = getUserFromJwtCookie(request)

    if (user === null) {
        response.status(500)
        return
    }

    const userIsOwner = await doesUserOwnOrder(user.id, id)

    if (!userIsOwner) {
        response.status(404)
        return
    }

    await performDelete(response, () => deleteOrder(id))
})

export default handler
