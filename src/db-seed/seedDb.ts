import { Prisma, ProductEntity } from "@prisma/client"
import { prisma } from "@/prisma"
import { hashPassword } from "@/bll/hashing"
import { Product } from "@/model"
import { orders } from "./orders"
import { products, imageUrl } from "./products"
import { MockUser, users } from "./users"

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
                title: `${order.title} of ${user.email}`,
                createdAt: order.createdAt,
            },
        })

        for (const product of products) {
            const createFields = productModelToCreateFields(product, orderId)
            createFields.title = `${createFields.title} of ${user.email}`

            await tx.productEntity.create({
                data: createFields,
            })
        }

        await tx.productEntity.create({
            data: {
                title: `Special product of ${user.email}`,
                type: `Product of ${user.email}`,
                serialNumber: "SN100",
                imageUrl,
                availability: "Available",
                usedOrNew: "Used",
                guaranteeEnd: 172800000,
                groupName: "Insatiable High inc.",

                priceUsd: 4200,
                priceUah: 100000,

                customerFullName: "Bilbo Baggins",
                orderId,
            },
        })
    }
}

export function productModelToCreateFields(
    model: Product,
    orderId: number
): Omit<ProductEntity, "id"> {
    const obj = { ...model } as any

    delete obj.id
    delete obj.order
    obj.orderId = orderId

    return obj
}

export const expectedProductsCount = orders.length * (products.length + 1)
