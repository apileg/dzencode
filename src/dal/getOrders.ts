import { Order } from "@/model"
import { prisma } from "@/prisma"

export async function getOrders(): Promise<Order[]> {
    const entities = (await prisma.$queryRaw`
        select
            o.id,
            o.title,
            o.createdAt,
            count(p.id) as productsCount,
            sum(p.priceUsd) as totalUsd,
            sum(p.priceUah) as totalUah
        from
            orderEntity as o
        inner join
            productEntity as p
        on
            p.orderId = o.id
        group by
            o.id
    `) as any[]

    const orders = entities.map((e) => ({
        ...e,

        // count() fields have bigint type for some reason
        productsCount: Number(e.productsCount),
        totalUsd: Number(e.totalUsd),
        totalUah: Number(e.totalUah),
    }))

    return orders
}
