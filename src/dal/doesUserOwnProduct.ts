import { prisma } from "@/prisma"

export async function doesUserOwnProduct(
    userId: number,
    productId: number
): Promise<boolean> {
    const product = await prisma.productEntity.findFirst({
        select: {
            order: {
                select: {
                    userId: true,
                },
            },
        },

        where: {
            id: productId,
        },
    })

    return product?.order.userId === userId
}
