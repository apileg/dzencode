import { prisma } from "@/prisma"
import { Prisma } from "@prisma/client"

export async function getProductTypes(userId: number): Promise<string[]> {
    return await prisma.$transaction(async (tx) => {
        const orderIds = await getOrderIdsOfUser(tx, userId)
        return await getProductTypesOfOrders(tx, orderIds)
    })
}

async function getOrderIdsOfUser(
    tx: Prisma.TransactionClient,
    userId: number
): Promise<number[]> {
    const rows = await tx.orderEntity.findMany({
        select: {
            id: true,
        },

        where: {
            userId,
        },
    })

    return rows.map((r) => r.id)
}

async function getProductTypesOfOrders(
    tx: Prisma.TransactionClient,
    orderIds: number[]
): Promise<string[]> {
    const rows = await tx.productEntity.findMany({
        select: {
            type: true,
        },

        where: {
            orderId: {
                in: orderIds,
            },
        },

        distinct: ["type"],
    })

    return rows.map((r) => r.type)
}
