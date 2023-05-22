import { NextRequest, NextResponse } from "next/server"
import { verifyJwt } from "./bll/jwt"
import { PlainUser } from "./model"

export async function middleware(request: NextRequest): Promise<NextResponse> {
    const jwtCookie = request.cookies.get("id")

    if (jwtCookie === undefined) {
        return handleGuest(request)
    }

    const jwt = jwtCookie.value

    try {
        await verifyJwt(jwt)
    } catch (error) {
        return handleGuest(request)
    }

    return handleLoggedIn(request)
}

function handleGuest(request: NextRequest): NextResponse {
    const { pathname } = request.nextUrl

    if (isPublicPath(pathname)) {
        return NextResponse.next()
    }

    return redirectToPath(request, "/login")
}

function isPublicPath(path: string) {
    return (
        ["/login", "/api/auth", "/favicon.ico"].includes(path) ||
        path.startsWith("/_next")
    )
}

function handleLoggedIn(request: NextRequest): NextResponse {
    const { pathname } = request.nextUrl

    if (pathname === "/login" || pathname === "/api/auth") {
        return redirectToPath(request, "/")
    }

    return NextResponse.next()
}

function redirectToPath(request: NextRequest, path: string): NextResponse {
    const url = new URL(request.nextUrl)
    url.pathname = path
    return NextResponse.redirect(url)
}
