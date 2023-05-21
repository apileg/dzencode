import { prisma } from "@/prisma"
import { seedDb } from "./seedAndClear"

async function main() {
    try {
        await prisma.$transaction(async (tx) => {
            await seedDb(tx)
        })
    } finally {
        await prisma.$disconnect()
    }
}

main()
