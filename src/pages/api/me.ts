import { NextApiHandler } from "next"
import { decodeFromRequest } from "@/bll/jwt"

const handler: NextApiHandler = async (request, response) => {
    try {
        if (request.method !== "GET") {
            return
        }

        // Unfortunately, there seem to be no way to pass a data from `middleware.ts`
        // here. `middleware.ts` already decode JWT, but we will need to decode it here
        // again

        // Note that we *decode* JWT, but we *don't verify* it here, since
        // `middleware.ts` already takes care of that. It's also faster to decode
        // JWT without verifying

        // We cannot parse JWT on client, since it's store in HttpOnly cookie for
        // security

        const user = decodeFromRequest(request)
        response.json(user)
    } finally {
        response.end()
    }
}

export default handler
