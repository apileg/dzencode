import { hashPassword } from "@/bll/hashing"
import { floatToCents } from "@/bll/money-conversion"
import { orders } from "@/mock-data/orders"
import { products } from "@/mock-data/products"
import { Product } from "@/model"
import { prisma } from "@/prisma"
import { ProductEntity } from "@prisma/client"

async function seedOrdersAndProducts() {
    prisma.$transaction(async (tx) => {
        const { id: userId } = await tx.userEntity.create({
            data: {
                avatarUrl: "/photos/takanaka.jpeg",
                email: "takanaka@seychelles.com",
                passwordHash: await hashPassword("takanaka"),
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
    })
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

seedOrdersAndProducts()
    .catch((error) => console.log(error))
    .finally(() => prisma.$disconnect())
