import { formJwtCookie, signJwt } from "@/bll/jwt"
import { tryLogin } from "@/dal/tryLogin"
import { NextApiHandler, NextApiRequest } from "next"
import { z, ZodError } from "zod"

const handler: NextApiHandler = async (request, response) => {
    try {
        if (request.method !== "POST") {
            response.status(404)
            return
        }

        const result = await handlePostAuth(request)

        if (result.type === "error") {
            response.json(result)
            return
        }

        if (result.type === "ok") {
            response.setHeader("Set-Cookie", formJwtCookie(result.jwt))

            const body: PostAuthResponseBody = {
                type: "ok",
            }

            response.json(body)
            return
        }
    } finally {
        response.end()
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
    request: NextApiRequest
): Promise<HandlePostAuthResult> => {
    let body: Body

    try {
        // For some reason, when body is empty, it's set to an empty string
        const formBody = request.body === "" ? {} : request.body

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
                jwt: await signJwt(loginResult.user),
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
