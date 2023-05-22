import { $ } from "execa"

async function migrateOrTimeout() {
    let elapsedMs = 0
    const timeoutMs = 30_000
    const tryDelayMs = 2000

    while (true) {
        try {
            const { stdout } = await $`npx prisma migrate deploy`
            console.log(stdout)
            return
        } catch (error) {
            if (!isErrorBecauseDbIsNotRunningYet(error)) {
                console.dir(error)
                process.exitCode = 1
                return
            }
        }

        if (elapsedMs >= timeoutMs) {
            console.error(`Database connection failed after ${elapsedMs} ms`)
            process.exitCode = 1
            return
        }

        await delay(tryDelayMs)
        elapsedMs += tryDelayMs
    }
}

function isErrorBecauseDbIsNotRunningYet(error: any) {
    const maybeStderr = error.stderr

    if (typeof maybeStderr !== "string") {
        return false
    }

    return maybeStderr.includes("P1001") || maybeStderr.includes("P1017")
}

function delay(ms: number): Promise<void> {
    return new Promise<void>((resolve, _reject) => {
        setTimeout(resolve, ms)
    })
}

migrateOrTimeout()
