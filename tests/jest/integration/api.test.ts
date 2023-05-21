import { createMocks } from "node-mocks-http"
import productsTypes from "@/pages/api/products/types"
import { NextApiRequest, NextApiResponse } from "next"
import { clearDb, seedDb } from "@/dal/seedDb"
import { prisma } from "@/prisma"
import handler from "@/pages/api/product/[id]"

beforeAll(async () => {
    await prisma.$transaction(async (tx) => {
        await clearDb(tx)
        await seedDb(tx)
    })
})

test("GET products", async () => {
    const { req, res } = createMocks<NextApiRequest, NextApiResponse>({
        method: "GET",
        path: "/api/products/types",
    })

    await productsTypes(req, res)
    expect(res._getStatusCode()).toBe(200)
    console.log(JSON.parse(res._getData()).length)
})

test("DELETE product", async () => {
    const { req, res } = createMocks<NextApiRequest, NextApiResponse>({
        method: "DELETE",
        path: "/api/product/42",
    })

    await handler(req, res)
    expect(res._getStatusCode()).toBe(200)
})

describe("GET products by orderID and DELETE order by ID", () => {})
