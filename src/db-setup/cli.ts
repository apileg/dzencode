import { $ } from "execa"

async function migrateDbOrTimeout() {
    const maxTries = 5
    const tryDelayMs = 2000
    let tries = 0

    while (true) {
        try {
            await $`npx prisma migrate deploy`
            return
        } catch (error) {
            if (!isPrismaDeployErrorCausedByDatabaseNotYetRunning(error)) {
                console.error("Got unknown error: ")
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

        console.error(
            `\`prisma deploy\` failed. Retrying after ${tryDelayMs}ms`
        )
        await delay(tryDelayMs)
    }
}

function isPrismaDeployErrorCausedByDatabaseNotYetRunning(error: any) {
    const maybeStderr = error.stderr
    return typeof maybeStderr === "string" && maybeStderr.includes("P1001")
}

function delay(ms: number): Promise<void> {
    return new Promise<void>((resolve, reject) => {
        setTimeout(resolve, ms)
    })
}

migrateDbOrTimeout()
