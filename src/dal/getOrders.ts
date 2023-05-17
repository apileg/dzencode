import { prisma } from "@/prisma"
import { Order } from "@/model"

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
        productsCount: Number(e.productsCount),
        totalUsd: Number(e.totalUsd / 100),
        totalUah: Number(e.totalUah / 100),
    }))

    return orders
}
