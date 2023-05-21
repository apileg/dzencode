import { prisma } from "@/prisma"
import { NextApiRequest, NextApiResponse } from "next"

import {
    createMocks as doCreateMocks,
    RequestOptions,
    ResponseOptions,
} from "node-mocks-http"

import postAuth from "@/pages/api/auth"

import { products } from "@/db-seed/products"
import { users } from "@/db-seed/users"

function createMocks(
    reqOptions?: RequestOptions | undefined,
    resOptions?: ResponseOptions | undefined
) {
    return doCreateMocks<NextApiRequest, NextApiResponse>(
        reqOptions,
        resOptions
    )
}

let jwt: string
const user = users[0]

beforeAll(async () => {
    await setupDb()
    jwt = await loginAndGetJwtCookie()
})

async function setupDb() {
    await prisma.$transaction(async (tx) => {
        await seedDb(tx)
    })
}

async function loginAndGetJwtCookie(): Promise<string> {
    const { req, res } = createMocks({
        method: "POST",
        path: "/api/auth",

        body: {
            email: user.email,
            password: user.password,
        },
    })

    await postAuth(req, res)

    const status = res._getStatusCode()

    if (status !== 200) {
        throw new Error(`Got status: ${status}`)
    }

    const jwt = res.cookies["id"]?.value

    if (!jwt) {
        throw new Error("Server did not set `id` cookie")
    }

    return jwt
}

// test auth, cascade delete

test("GET /api/products", async () => {
    const { req, res } = createMocks({
        method: "GET",
        path: "/api/products",

        cookies: {
            id: jwt,
        },
    })

    expect(res._getStatusCode()).toBe(200)

    const returnedProducts = JSON.parse(res._getData())
    expect(returnedProducts).toMatchObject(products)
})

test("DELETE /api/order/[id]", async () => {})

test("DELETE /api/product/[id]", async () => {})
