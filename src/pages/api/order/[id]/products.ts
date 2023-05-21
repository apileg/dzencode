import { NextApiHandler } from "next"
import { parseId } from "../../_utils/parseId"
import { getUserFromJwtCookie } from "@/bll/jwt"
import { doesUserOwnOrder } from "@/dal/doesUserOwnOrder"
import { getProductsOfOrder } from "@/dal/getProductsOfOrder"

const handler: NextApiHandler = async (request, response) => {
    try {
        if (request.method !== "GET") {
            response.status(404)
            return
        }

        const id = parseId(request)

        if (id === null) {
            response.status(404)
            return
        }

        const user = getUserFromJwtCookie(request)

        // Should never happen, since `middleware.ts` would redirect
        // user if they are not authenticated
        if (user === null) {
            response.status(500)
            return
        }

        const userIsOwner = await doesUserOwnOrder(user.id, id)

        if (!userIsOwner) {
            response.status(404)
            return
        }

        const products = await getProductsOfOrder(id)
        response.status(200).json(products)
    } finally {
        response.end()
    }
}

export default handler
