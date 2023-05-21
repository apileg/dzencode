import { $ } from "execa"

async function migrateOrTimeout() {
    let tries = 0
    const maxTries = 5
    const tryToMs = 2000

    while (true) {
        try {
            await $({ stdio: "inherit" })`npx prisma migrate deploy`
            return
        } catch (error) {
            if (!isErrorBecauseDbIsNotRunningYet(error)) {
                console.dir(error)
                process.exitCode = 1
                return
            }
        }

        ++tries

        if (tries >= maxTries) {
            console.error(`Database connection failed after ${tries} tries`)
            process.exitCode = 1
            return
        }

        await delay(tryToMs)
    }
}

function isErrorBecauseDbIsNotRunningYet(error: any) {
    const maybeStderr = error.stderr
    return typeof maybeStderr === "string" && maybeStderr.includes("P1001")
}

function delay(ms: number): Promise<void> {
    return new Promise<void>((resolve, _reject) => {
        setTimeout(resolve, ms)
    })
}

migrateOrTimeout()
