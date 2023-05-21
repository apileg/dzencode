import { prisma } from "@/prisma"

export async function deleteOrder(id: number): Promise<void> {
    await prisma.orderEntity.delete({ where: { id } })
}
