import { prisma } from "@/prisma"
import { Product } from "@/model"

export async function getProducts({
    type,
}: {
    type?: string | undefined
}): Promise<Product[]> {
    // Query 2
    const products = await prisma.productEntity.findMany({
        include: {
            order: true,
        },

        where: { type },
    })

    return products
}
