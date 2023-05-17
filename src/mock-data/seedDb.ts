import { ProductEntity } from "@prisma/client"
import { prisma } from "../prisma"
import { Product } from "./../model"
import { orders } from "./orders"
import { products } from "./products"

async function seedOrdersAndProducts() {
    prisma.$transaction(async (tx) => {
        for (const order of orders) {
            const { id } = await tx.orderEntity.create({
                data: {
                    title: order.title,
                    createdAt: order.createdAt,
                },
            })

            for (const product of products) {
                await tx.productEntity.create({
                    data: productModelToCreateFields(product, id),
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

function floatToCents(n: number) {
    return Math.floor(n * 100)
}

seedOrdersAndProducts()
    .catch((error) => console.log(error))
    .finally(() => prisma.$disconnect())
