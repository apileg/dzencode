import { prisma } from "@/prisma"
import { Product } from "@/model"

export interface ProductsFilter {
    type?: string | undefined
    orderId?: number | undefined
}

export async function getProducts({
    type,
    orderId,
}: ProductsFilter): Promise<Product[]> {
    const products = await prisma.productEntity.findMany({
        include: {
            order: true,
        },

        where: { type, orderId },
    })

    return products
}
