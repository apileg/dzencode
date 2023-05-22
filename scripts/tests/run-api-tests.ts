import { $ } from "execa"
import axios from "axios"
import { retry } from "../retry"
import { NEXT_APP_HOST, NEXT_APP_PORT } from "./api-tests-contants"

const quiet = process.argv.includes("q") || process.argv.includes("quiet")

const $stdio = $({ stdio: "inherit" })
const $maybeStdio = $({ stdio: quiet ? undefined : "inherit" })

async function main() {
    await withMySql(async () => {
        await withNextApp(runTests)
    })
}

async function runTests() {
    try {
        await $stdio`npx jest ./tests/jest/integration`
    } catch {
        process.exitCode = 1
    }
}

async function withMySql(fn: () => Promise<void>) {
    const cwd = $maybeStdio({ cwd: __dirname })
    await cwd`docker compose up -d`

    const dbEnv = $maybeStdio({
        env: {
            ...process.env,
            DATABASE_URL: "mysql://root@localhost:3307/tests",
        },
    })

    try {
        await dbEnv`npm run migrate`
        await dbEnv`npm run seed`
        await fn()
    } finally {
        await cwd`docker compose down --volumes`
    }
}

async function withNextApp(fn: () => Promise<void>) {
    const portEnv = $maybeStdio({
        env: {
            ...process.env,

            // Since tests use `127.0.0.1` (because axios breaks with `localhost`)
            // we need to use `127.0.0.1` as domain for JWT cookies
            JWT_COOKIE_DOMAIN: NEXT_APP_HOST,

            PORT: NEXT_APP_PORT,
        },
    })

    const nextApp = portEnv`npm run start`

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
    } catch (error) {
        if (!quiet) {
            const e = error as any
            console.log(`API call error: ${e.message}`)
        }

        return false
    }
}

main()
