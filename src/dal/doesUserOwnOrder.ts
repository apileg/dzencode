import { prisma } from "@/prisma"

export async function doesUserOwnOrder(
    userId: number,
    orderId: number
): Promise<boolean> {
    const order = await prisma.orderEntity.findFirst({
        select: {
            userId: true,
        },

        where: {
            id: orderId,
        },
    })

    return order?.userId === userId
}
