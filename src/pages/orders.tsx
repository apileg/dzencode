import OrderPage, { OrderPageProps } from "@/components/order/OrderPage"
import { prisma } from "@/prisma"
import { GetServerSideProps } from "next"

export default function Home(props: OrderPageProps) {
    // Make sure that <OrderPage> will never get unmounted. That's
    // because `props` here will contain the list of orders as it was
    // at the moment of the page load. Since that time, the list of orders
    // could have changed, but `props` won't get updated

    // `props` is used only for Zustand initial state

    // That's why Next.js 13 version got `fetch()` instead of getServerSideProps
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

        // count() fields have bigint type for some reason
        productsCount: Number(e.productsCount),
        totalUsd: Number(e.totalUsd),
        totalUah: Number(e.totalUah),
    }))

    return {
        props: {
            initialOrders: orders,
        },
    }
}
