import { $ } from "execa"

const DATABASE_URL = "mysql://root@localhost:3307/tests"

async function main() {
    await $({ cwd: __dirname })`docker compose up -d`

    try {
        const env = { ...process.env, DATABASE_URL }
        await $({ stderr: "inherit", env })`npm run migrate`

        // Jest will fail every time there's a failing test.
        // Set `reject: false` to prevent this line from throwing error in
        // such cases

        await $({
            reject: false,
            stdio: "inherit",
            env,
        })`npx jest ./tests/jest/integration`
    } finally {
        await $({ cwd: __dirname })`docker compose down --volumes`

        console.log()

        console.log(
            "Note: images built by `docker compose` are still on your computer."
        )
        console.log(
            "This is made for faster test startups. If you want to delete all "
        )
        console.log(
            "data created by `docker compose`, run `docker compose down --rmi all` manually"
        )

        console.log()
    }
}

main()
