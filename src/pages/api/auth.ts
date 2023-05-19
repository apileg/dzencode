import { formCookie, sign } from "@/bll/jwt"
import { tryLogin } from "@/dal/tryLogin"
import { NextApiHandler, NextApiRequest } from "next"
import { z, ZodError } from "zod"

const handler: NextApiHandler = async (req, res) => {
    try {
        if (req.method !== "POST") {
            res.status(404)
            return
        }

        const result = await handlePostAuth(req)

        if (result.type === "error") {
            res.status(400)

            const body: PostAuthResponseBody = {
                type: "error",
                errors: result.errors,
            }

            res.json(body)
            return
        }

        if (result.type === "ok") {
            res.setHeader("Set-Cookie", formCookie(result.jwt))

            const body: PostAuthResponseBody = {
                type: "ok",
            }

            res.json(body)
            return
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

type HandlePostAuthResult =
    | {
          type: "ok"
          jwt: string
      }
    | {
          type: "error"
          errors: PostAuthErrors
      }

const handlePostAuth = async (
    req: NextApiRequest
): Promise<HandlePostAuthResult> => {
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

    const loginResult = await tryLogin(body)

    switch (loginResult.type) {
        case "ok":
            return {
                type: "ok",
                jwt: await sign(loginResult.user),
            }

        case "emailNotFound":
            return {
                type: "error",
                errors: {
                    email: ["Email not found"],
                    password: [],
                },
            }

        case "wrongPassword":
            return {
                type: "error",
                errors: {
                    email: [],
                    password: ["Wrong password"],
                },
            }
    }
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
