import { NextApiHandler } from "next"
import { z } from "zod"
import { getProducts } from "@/dal/getProducts"

const queryZod = z.object({
    type: z.string().optional(),
})

type Query = z.infer<typeof queryZod>

const handler: NextApiHandler = async (req, res) => {
    try {
        if (req.method !== "GET") {
            res.status(404)
            return
        }

        let query: Query

        try {
            query = queryZod.parse(req.query)
        } catch {
            res.status(400)
            return
        }

        const products = await getProducts({ type: query.type })
        res.json(products)
    } finally {
        res.end()
    }
}

export default handler
