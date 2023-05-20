import { hashPassword } from "@/bll/hashing"
import { floatToCents } from "@/bll/money-conversion"
import { orders } from "@/mock-data/orders"
import { products } from "@/mock-data/products"
import { Product } from "@/model"
import { ProductEntity, Prisma } from "@prisma/client"

export async function seedDb(tx: Prisma.TransactionClient) {
    const { id: userId } = await tx.userEntity.create({
        data: {
            avatarUrl: "/photos/takanaka.jpeg",
            email: "user@site.io",
            passwordHash: await hashPassword("password"),
        },
    })

    for (const order of orders) {
        const { id: orderId } = await tx.orderEntity.create({
            data: {
                userId,
                title: order.title,
                createdAt: order.createdAt,
            },
        })

        for (const product of products) {
            await tx.productEntity.create({
                data: productModelToCreateFields(product, orderId),
            })
        }
    }
}

export async function clearDb(tx: Prisma.TransactionClient) {
    await tx.productEntity.deleteMany()
    await tx.orderEntity.deleteMany()
    await tx.userEntity.deleteMany()
}

function productModelToCreateFields(
    model: Product,
    orderId: number
): Omit<ProductEntity, "id"> {
    const obj = { ...model } as any

    delete obj.id
    delete obj.order
    obj.orderId = orderId

    obj.priceUsd = floatToCents(model.priceUsd)
    obj.priceUah = floatToCents(model.priceUah)

    return obj
}
