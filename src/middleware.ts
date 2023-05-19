import type { NextRequest } from "next/server"
import { NextResponse } from "next/server"
import { verify } from "./bll/jwt"

export async function middleware(request: NextRequest): Promise<NextResponse> {
    const { pathname } = request.nextUrl

    if (isOpenPath(pathname)) {
        return NextResponse.next()
    }

    const jwtCookie = request.cookies.get("id")

    if (jwtCookie === undefined) {
        return redirectToLogin()
    }

    const jwt = jwtCookie.value

    try {
        await verify(jwt)
    } catch (error) {
        return redirectToLogin()
    }

    return NextResponse.next()

    function redirectToLogin(): NextResponse {
        const url = new URL(request.nextUrl)
        url.pathname = "/login"

        return NextResponse.redirect(url)
    }
}

const guestRoutes = ["/login", "/api/auth"]

function isOpenPath(path: string) {
    return guestRoutes.includes(path) || path.startsWith("/_next")
}
