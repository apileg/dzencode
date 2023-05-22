/**
 * @jest-environment node
 */

import { PostAuthResponseBody } from "@/pages/api/auth"
import globalAxios, { Axios } from "axios"
import { parse } from "set-cookie-parser"
import { Product } from "@/model"
import { products } from "@/db-seed/products"

import {
    NEXT_APP_HOST,
    NEXT_APP_PORT,
} from "../../../scripts/tests/api-tests-contants"

globalAxios.defaults.baseURL = `http://${NEXT_APP_HOST}:${NEXT_APP_PORT}/`
globalAxios.defaults.withCredentials = true

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
    test("guests are redirected to login", async () => {
        const response = await globalAxios.get("/api/products")
        const fetchedUrl = response.request.res.responseUrl as string

        expect(fetchedUrl.endsWith("/login")).toBe(true)
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

// describe("data access", () => {
//     const client = globalAxios.create()

//     beforeAll(async () => {
//         await login(client)
//     })

//     test("users only see their products", async () => {
//         const response = await client.get("/api/products")

//         const body = response.data as Product[]
//         body.sort((a, b) => a.id - b.id)
//     })
// })
