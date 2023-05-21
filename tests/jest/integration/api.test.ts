// import { clearDb, seedDb } from "@/dal/seedDb"
import productsTypes from "@/pages/api/products/types"
import { prisma } from "@/prisma"
import { NextApiRequest, NextApiResponse } from "next"
import { createMocks } from "node-mocks-http"

// beforeAll(async () => {
//     await prisma.$transaction(async (tx) => {
//         await clearDb(tx)
//         await seedDb(tx)
//     })
// })

test("GET products", async () => {
    const { req, res } = createMocks<NextApiRequest, NextApiResponse>({
        method: "GET",
        path: "/api/products/types",
    })

    await productsTypes(req, res)
    expect(res._getStatusCode()).toBe(200)
    console.log(JSON.parse(res._getData()).length)
})

// test auth, cascade delete
