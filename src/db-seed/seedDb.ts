import { floatToCents } from "@/bll/money-conversion"
import { Product } from "@/model"
import { prisma } from "@/prisma"
import { UserEntity, ProductEntity, Prisma } from "@prisma/client"
import { orders } from "./orders"
import { products } from "./products"
import { getUsers } from "./getUsers"

export async function clearDb(tx: Prisma.TransactionClient) {
    await tx.productEntity.deleteMany()
    await tx.orderEntity.deleteMany()
    await tx.userEntity.deleteMany()
}

export async function seedDb(tx: Prisma.TransactionClient) {
    await prisma.$transaction(async (tx) => {
        for (const user of await getUsers()) {
            await seedUser(tx, user)
        }
    })
}

async function seedUser(
    tx: Prisma.TransactionClient,
    user: Omit<UserEntity, "id">
) {
    const { id: userId } = await tx.userEntity.create({
        data: user,
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
