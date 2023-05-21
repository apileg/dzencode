import { prisma } from "@/prisma"

export async function deleteProduct(id: number): Promise<void> {
    await prisma.productEntity.delete({ where: { id } })
}
