/**
 * @jest-environment node
 */

import {
    expectedProductsCount,
    productModelToCreateFields,
    seedDb,
} from "@/db-seed/seedDb"
import { Product } from "@/model"
import { PostAuthResponseBody } from "@/pages/api/auth"
import globalAxios, { Axios, AxiosError } from "axios"
import { parse } from "set-cookie-parser"
import { orders } from "@/db-seed/orders"

import {
    NEXT_APP_HOST,
    NEXT_APP_PORT,
} from "@/../scripts/tests/next-app-constants"
import { prisma } from "@/prisma"
import { products } from "@/db-seed/products"

globalAxios.defaults.baseURL = `http://${NEXT_APP_HOST}:${NEXT_APP_PORT}/`
globalAxios.defaults.withCredentials = true

beforeAll(async () => {
    await seedDb()
})

describe("/api/auth", () => {
    test("incorrect email", async () => {
        const response = await globalAxios.post("/api/auth", {
            email: "incorrectemail@gmail.com",
            password: "password",
        })

        const body = response.data as PostAuthResponseBody

        if (body.type !== "error") {
            throw new Error(`Expected response.type to be \`error\``)
        }

        expect(body.errors.email).toHaveLength(1)
    })

    test("incorrect password", async () => {
        const response = await globalAxios.post("/api/auth", {
            email: "a@a.com",
            password:
                "helpmepleaseibeenwritingtestfor3dayswithterribledockerhelpheeeelp",
        })

        const body = response.data as PostAuthResponseBody

        if (body.type !== "error") {
            throw new Error(`Expected response.type to be \`error\``)
        }

        expect(body.errors.password).toHaveLength(1)
    })

    test("correct credentials", async () => {
        const response = await globalAxios.post("/api/auth", {
            email: "a@a.com",
            password: "password",
        })

        const body = response.data as PostAuthResponseBody
        expect(body.type).toBe("ok")

        expect(response.headers["set-cookie"]).toBeTruthy()
    })
})

async function login(client: Axios) {
    const response = await client.post("/api/auth", {
        email: "a@a.com",
        password: "password",
    })

    const setCookie = response.headers["set-cookie"]!
    const cookies = parse(setCookie)

    const { name, value } = cookies[0]
    client.defaults.headers.common["Cookie"] = `${name}=${value}`
}

describe("middleware", () => {
    test.each(["/api/me", "/api/products", "/orders"])(
        "guests are redirected to login",

        async (path) => {
            const response = await globalAxios.get(path)
            const fetchedUrl = response.request.res.responseUrl as string

            expect(fetchedUrl.endsWith("/login")).toBe(true)
        }
    )

    test.each([
        "/favicon.ico",
        "/login",
        "/_next/if-i-wanted-i-could-visit-this",
    ])("guests can access essential routes", async (path) => {
        // Nonexistent paths might throw error because of 404,
        // but no redirects should happen
        try {
            const response = await globalAxios.get(path)
            const fetchedUrl = response.request.res.responseUrl as string
            expect(fetchedUrl.endsWith(path)).toBe(true)
        } catch (error) {
            if (error instanceof AxiosError) {
                expect(error.response?.status).toBe(404)
                return
            }

            throw error
        }
    })

    describe("logged in users", () => {
        const client = globalAxios.create()

        beforeAll(async () => {
            await login(client)
        })

        test("are redirected from /login to /orders", async () => {
            const response = await client.get("/login")
            const fetchedUrl = response.request.res.responseUrl as string

            expect(fetchedUrl.endsWith("/orders")).toBe(true)
        })

        test("are redirected from /api/auth to /orders", async () => {
            const response = await client.post("/api/auth", {
                email: "redirected",
                password: "away",
            })

            const fetchedUrl = response.request.res.responseUrl as string
            expect(fetchedUrl.endsWith("/orders")).toBe(true)
        })
    })
})

describe("data access", () => {
    const client = globalAxios.create()

    beforeAll(async () => {
        await login(client)
    })

    test("users only see their products", async () => {
        const response = await client.get("/api/products")
        const body = response.data as Product[]

        expect(body.length).toBe(expectedProductsCount)
        expect(areProductsOfUserA(body)).toBe(true)
        expect(areProductsOfUserA(body)).toBe(true)
    })

    test("users only see types of their orders", async () => {
        const response = await client.get("/api/products/types")

        const body = response.data as string[]
        const expected = ["Type A", "Type B", "Type C", "Product of a@a.com"]

        expect(body.sort()).toMatchObject(expected.sort())
    })

    test("users only see their products in /api/order/id/products", async () => {
        for (let id = 1; id < orders.length; ++id) {
            const response = await client.get(`/api/order/${id}/products`)
            const body = response.data as Product[]

            expect(areProductsOfUserA(body)).toBe(true)
        }
    })

    function areProductsOfUserA(product: Product[]) {
        return product.every((p) => p.title.includes("of a@a.com"))
    }
})

describe("deletion", () => {
    const client = globalAxios.create()

    let orderToDeleteId: number
    let orderNotPossibleToDeleteId: number

    let productToDeleteId: number
    let productToCascadeDeleteId: number
    let productNotPossibleToDeleteId: number

    beforeAll(async () => {
        await login(client)

        const orderToDelete = await prisma.orderEntity.create({
            data: {
                title: "IDisposable",
                createdAt: 0,
                userId: 1,
            },
        })

        orderToDeleteId = orderToDelete.id

        const orderNotPossibleToDelete = await prisma.orderEntity.create({
            data: {
                title: "Can't delete",
                createdAt: 0,
                userId: 2,
            },
        })

        orderNotPossibleToDeleteId = orderNotPossibleToDelete.id

        const productToDelete = await prisma.productEntity.create({
            data: {
                ...productModelToCreateFields(products[0], 1),
                title: "ITrashable",
            },
        })

        productToDeleteId = productToDelete.id

        const productToCascadeDelete = await prisma.productEntity.create({
            data: {
                ...productModelToCreateFields(products[0], orderToDeleteId),
                title: "I will be deleted with cascade deletion",
            },
        })

        productToCascadeDeleteId = productToCascadeDelete.id

        const idOfFirstOrderOfTakanaka = orders.length + 1

        const productNotPossibleToDelete = await prisma.productEntity.create({
            data: {
                ...productModelToCreateFields(
                    products[0],
                    idOfFirstOrderOfTakanaka
                ),
                title: "Can't delete",
            },
        })

        productNotPossibleToDeleteId = productNotPossibleToDelete.id
    })

    afterAll(async () => {
        await prisma.orderEntity.deleteMany({
            where: {
                id: {
                    in: [orderNotPossibleToDeleteId, orderToDeleteId],
                },
            },
        })

        await prisma.productEntity.deleteMany({
            where: {
                id: {
                    in: [
                        productToDeleteId,
                        productNotPossibleToDeleteId,
                        productToCascadeDeleteId,
                    ],
                },
            },
        })
    })

    test("users can delete their orders; cascade deletion works", async () => {
        const response = await client.delete(`/api/order/${orderToDeleteId}`)
        expect(response.status).toBe(200)

        await expect(async () => {
            await client.delete(`/api/product/${productToCascadeDeleteId}`)
        }).rejects.toThrowError("404")
    })

    test("users cannot delete other users' orders", async () => {
        await expect(() =>
            client.delete(`/api/order/${orderToDeleteId}`)
        ).rejects.toThrowError("404")
    })

    test("users can delete their products", async () => {
        const response = await client.delete(
            `/api/product/${productToDeleteId}`
        )

        expect(response.status).toBe(200)
    })

    test("users cannot delete other users' products", async () => {
        await expect(() =>
            client.delete(`/api/product/${productNotPossibleToDeleteId}`)
        ).rejects.toThrowError("404")
    })
})
