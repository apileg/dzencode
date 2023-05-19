import { NextApiHandler, NextApiRequest, NextApiResponse } from "next"
import { z, ZodError } from "zod"

const handler: NextApiHandler = async (req, res) => {
    try {
        switch (req.method) {
            case "POST":
                return await postAuth(req, res)

            default:
                res.status(404)
        }
    } finally {
        res.end()
    }
}

export default handler

export type PostAuthResponseBody =
    | {
          type: "ok"
      }
    | {
          type: "error"
          errors: PostAuthErrors
      }

export interface PostAuthErrors {
    email: string[]
    password: string[]
}

const postAuth = async (req: NextApiRequest, res: NextApiResponse) => {
    const body = await handlePostAuth(req)

    if (body.type === "error") {
        res.status(400)
    }

    res.json(body)
}

const handlePostAuth = async (
    req: NextApiRequest
): Promise<PostAuthResponseBody> => {
    let body: Body

    try {
        // For some reason, when body is empty, it's set to an empty string
        const formBody = req.body === "" ? {} : req.body

        body = bodyZod.parse(formBody)
    } catch (error) {
        if (error instanceof ZodError) {
            return {
                type: "error",
                errors: error.formErrors.fieldErrors as any,
            }
        }

        // Never happens
        return {
            type: "error",

            errors: {
                email: [],
                password: [],
            },
        }
    }

    return { type: "ok" }
}

const bodyZod = z.object({
    email: z
        .string({
            required_error: "Email is a required field",
        })
        .email("Email looks invalid"),

    password: z
        .string({
            required_error: "Password is a required field",
        })
        .min(6, "Password should contain at least 6 characters"),
})

type Body = z.infer<typeof bodyZod>
