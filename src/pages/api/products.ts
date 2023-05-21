import { NextApiHandler } from "next"
import { z } from "zod"
import { getProducts } from "@/dal/getProducts"
import { getUserFromJwtCookie } from "@/bll/jwt"

const queryZod = z.object({
    type: z.string().optional(),
})

type Query = z.infer<typeof queryZod>

const handler: NextApiHandler = async (request, response) => {
    try {
        if (request.method !== "GET") {
            response.status(404)
            return
        }

        let query: Query

        try {
            query = queryZod.parse(request.query)
        } catch {
            response.status(400)
            return
        }

        const user = getUserFromJwtCookie(request)

        if (user === null) {
            response.status(500)
            return
        }

        const products = await getProducts(user.id, query.type)
        response.json(products)
    } finally {
        response.end()
    }
}

export default handler
