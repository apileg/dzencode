import { $ } from "execa"

async function main() {
    // Note: doesn't work on M1 macs
    await $`mkdir ./docker/https`
    await $`openssl req -new -x509 -sha256 -newkey rsa:2048 -nodes -keyout ./docker/https/key.pem -out ./docker/https/cert.pem`
}

main()
