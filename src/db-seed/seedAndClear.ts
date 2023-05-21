import { floatToCents } from "@/bll/money-conversion"
import { Product } from "@/model"
import { prisma } from "@/prisma"
import { ProductEntity, Prisma } from "@prisma/client"
import { orders } from "./orders"
import { products } from "./products"
import { users, MockUser } from "./users"
import { hashPassword } from "@/bll/hashing"

export async function clearDb(tx: Prisma.TransactionClient) {
    await tx.productEntity.deleteMany()
    await tx.orderEntity.deleteMany()
    await tx.userEntity.deleteMany()
}

export async function seedDb(tx: Prisma.TransactionClient) {
    for (const user of users) {
        await seedUser(tx, user)
    }
}

async function seedUser(tx: Prisma.TransactionClient, user: MockUser) {
    const { id: userId } = await tx.userEntity.create({
        data: {
            email: user.email,
            passwordHash: await hashPassword(user.password),
            avatarUrl: user.avatarUrl,
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
