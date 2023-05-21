import { prisma } from "@/prisma"
import { Product } from "@/model"

export async function getProducts(
    userId: number,
    type?: string | undefined
): Promise<Product[]> {
    const products = await prisma.productEntity.findMany({
        include: {
            order: true,
        },

        where: {
            order: {
                userId,
            },

            type,
        },
    })

    return products
}
