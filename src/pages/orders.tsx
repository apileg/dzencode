import OrderPage, { OrderPageProps } from "@/components/order/OrderPage"
import { prisma } from "@/db"
import { GetServerSideProps } from "next"

export default function Home(props: OrderPageProps) {
    return <OrderPage {...props} />
}

export const getServerSideProps: GetServerSideProps<
    OrderPageProps
> = async () => {
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

    return {
        props: {
            orders,
        },
    }
}
