import { Product } from "@/model"
import { prisma } from "@/prisma"

export async function getProductsOfOrder(orderId: number): Promise<Product[]> {
    const products = await prisma.productEntity.findMany({
        include: {
            order: true,
        },

        where: {
            orderId,
        },
    })

    return products
}
