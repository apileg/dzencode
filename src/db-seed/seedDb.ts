import { Prisma, ProductEntity } from "@prisma/client"
import { prisma } from "@/prisma"
import { hashPassword } from "@/bll/hashing"
import { Product } from "@/model"
import { MockUser, users } from "./users"
import { orders } from "./orders"
import { products } from "./products"

export async function seedDb() {
    return await prisma.$transaction(async (tx) => {
        const dbIsSeeded = await doAnyUsersExist(tx)

        if (dbIsSeeded) {
            return false
        }

        for (const user of users) {
            await seedUser(tx, user)
        }

        return true
    })
}

async function doAnyUsersExist(tx: Prisma.TransactionClient) {
    const rows = (await tx.$queryRaw`
        select count(*) as usersCount 
        from UserEntity
    `) as any[]

    const usersCount = rows[0]?.usersCount ?? 0
    return usersCount > 0
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

    return obj
}
