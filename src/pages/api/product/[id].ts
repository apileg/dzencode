import { NextApiHandler } from "next"
import { parseId } from "../_utils/parseId"
import { performDelete } from "../_utils/performDelete"
import { deleteProduct } from "@/dal/deleteProduct"
import { getUserFromJwtCookie } from "@/bll/jwt"
import { doesUserOwnProduct } from "@/dal/doesUserOwnProduct"

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

        const user = getUserFromJwtCookie(request)

        if (user === null) {
            response.status(500)
            return
        }

        const userIsOwner = await doesUserOwnProduct(user.id, id)

        if (!userIsOwner) {
            response.status(404)
            return
        }

        await performDelete(response, () => deleteProduct(id))
    } finally {
        response.end()
    }
}

export default handler
