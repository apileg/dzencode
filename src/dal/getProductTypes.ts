import { prisma } from "@/prisma"

export async function getProductTypes(): Promise<string[]> {
    // Query 3
    const rows = await prisma.productEntity.findMany({
        select: {
            type: true,
        },

        distinct: ["type"],
    })

    return rows.map((t) => t.type)
}
