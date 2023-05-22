import { $ } from "execa"
import { retry } from "../retry"

async function main() {
    await retry({
        fn: runMigrate,
        timeoutMs: 30_000,
        retryIntervalMs: 2000,
        timeoutMessage: (ms) => `Database connection failed after ${ms} ms`,
    })
}

async function runMigrate() {
    try {
        const { stdout } = await $`npx prisma migrate deploy`
        console.log(stdout)
    } catch (error) {
        if (isErrorBecauseDbIsNotRunningYet(error)) {
            return false
        }

        throw error
    }

    return true
}

function isErrorBecauseDbIsNotRunningYet(error: any) {
    const maybeStderr = error.stderr

    if (typeof maybeStderr !== "string") {
        return false
    }

    return maybeStderr.includes("P1001") || maybeStderr.includes("P1017")
}

main()
