import { PlainUser } from "@/model"
import * as jose from "jose"
import { NextApiRequest } from "next"

const secret = new TextEncoder().encode(process.env.JWT_SECRET)
const algorithm = "HS256"

const expiration = "1h"
const maxAgeSeconds = 60 * 60

export async function signJwt(user: PlainUser): Promise<string> {
    const jwt = new jose.SignJWT({ ...user })
        .setProtectedHeader({ alg: algorithm })
        .setIssuedAt()
        .setExpirationTime(expiration)
        .sign(secret)

    return jwt
}

export async function verifyJwt(jwt: string): Promise<PlainUser> {
    const result = await jose.jwtVerify(jwt, secret)
    return result.payload as any
}

export function formJwtCookie(jwt: string): string {
    // See https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Set-Cookie
    // And also see /SECURITY.md
    return (
        `id=${jwt}; Secure; HttpOnly; SameSite=Lax; Path=/;` +
        `Domain=${process.env.DOMAIN}; Max-Age=${maxAgeSeconds};`
    )
}

export interface RequestWithCookies {
    cookies: Record<string, string | undefined>
}

export function getUserFromJwtCookie(
    request: RequestWithCookies
): PlainUser | null {
    const jwt = request.cookies["id"]

    if (jwt === undefined) {
        return null
    }

    const result = jose.decodeJwt(jwt)

    return {
        _type: "plainUser",
        id: result.id as any,
        avatarUrl: result.avatarUrl as any,
    }
}
