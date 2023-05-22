import { $ } from "execa"
import axios from "axios"
import { retry } from "../retry"
import { NEXT_APP_HOST, NEXT_APP_PORT } from "./next-app-constants"
import { prisma } from "@/prisma"

const $stdio = $({ stdio: "inherit" })
const TESTS_DB_URL = "mysql://root@localhost:3307/tests"

async function main() {
    await withTestsDb(() => withNextApp(runTests))
}

async function withTestsDb(fn: () => Promise<void>) {
    await createTestsDbWithRetries()

    try {
        await runMigrations()
        await fn()
    } finally {
        await dropTestsDb()
    }
}

async function createTestsDbWithRetries() {
    await retry({
        fn: createTestsDb,
        timeoutMs: 30_000,
        retryIntervalMs: 3000,
        timeoutMessage: (ms) => `Database connection failed after ${ms} ms`,
    })
}

async function createTestsDb() {
    try {
        // Note: kind of tricky, but this line connects to `dzencode` database
        // specified in `docker-compose.mysql.yml`. `dzencode` is created by
        // default by `mysql` docker image

        // Prisma cannot connect to MySQL with no database specified. We
        // can always specify one of the system databases inside of MySQL
        // if something changes

        await prisma.$executeRaw`create database tests`
        return true
    } catch {
        return false
    }
}

async function runMigrations() {
    const $migrate = $stdio({
        env: {
            ...process.env,
            DATABASE_URL: TESTS_DB_URL,
        },
    })

    await $migrate`npx prisma migrate deploy`
}

async function dropTestsDb() {
    await prisma.$executeRaw`drop database tests`
}

async function withNextApp(fn: () => Promise<void>) {
    const $next = $stdio({
        env: {
            ...process.env,

            DATABASE_URL: TESTS_DB_URL,

            // Since tests use `127.0.0.1` (because axios breaks with `localhost`)
            // we need to use `127.0.0.1` as domain for JWT cookies
            JWT_COOKIE_DOMAIN: NEXT_APP_HOST,

            PORT: NEXT_APP_PORT,
        },
    })

    let nextApp = $next`npm run start`

    try {
        await waitForApiToStart()
        await fn()
    } finally {
        nextApp.kill()
    }
}

async function waitForApiToStart() {
    await retry({
        fn: getIndexPage,
        timeoutMs: 30_000,
        retryIntervalMs: 3000,
        timeoutMessage: (ms) => `API didn't start in ${ms} ms`,
    })
}

async function getIndexPage() {
    try {
        await axios.get(`http://${NEXT_APP_HOST}:${NEXT_APP_PORT}/`)
        return true
    } catch (_error) {
        return false
    }
}

async function runTests() {
    const $jest = $stdio({
        env: {
            ...process.env,
            DATABASE_URL: TESTS_DB_URL,
        },

        reject: false,
    })

    await $jest`npx jest ./tests/jest/integration`
}

main()
