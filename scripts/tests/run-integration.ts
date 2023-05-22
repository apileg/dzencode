import { $ } from "execa"
import { retry } from "../retry"
import axios from "axios"

// TODO: any way to reference the file with alias relative to root?
const pathToCompose = "../../docker/docker-compose.tests.yml"

async function main() {
    const cwd = $({ cwd: __dirname, stdio: "inherit" })
    await cwd`docker compose -f ${pathToCompose} up -d --build`

    try {
        await waitForApiToStart()

        // Jest will fail every time there's a failing test.
        // Set `reject: false` to prevent this line from throwing error in
        // such cases

        await $({
            reject: false,
            stdio: "inherit",
        })`npx jest ./tests/jest/integration`
    } finally {
        await cwd`docker compose -f ${pathToCompose} down --volumes`

        console.log()

        console.log(
            "Note: images built by `docker compose` are still on your computer."
        )

        console.log(
            "This is made for faster test startups. If you want to delete all data"
        )

        console.log(
            "created by `docker compose`, run `docker compose down --rmi all` manually"
        )

        console.log()
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
        await axios.get("http://localhost:3001/")
        return true
    } catch {
        return false
    }
}

main()
