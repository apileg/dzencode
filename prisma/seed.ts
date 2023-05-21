import { seedDb } from "@/db-seed/seedDb"
import { prisma } from "@/prisma"

async function main() {
    try {
        const seeded = await seedDb()

        if (!seeded) {
            console.error("Note: database was already seeded")
        }
    } finally {
        await prisma.$disconnect()
    }
}

main()
