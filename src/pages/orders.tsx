import OrderPage, { OrderPageProps } from "@/components/order/OrderPage"
import { prisma } from "@/prisma"
import { GetServerSideProps } from "next"
import { getOrders } from "@/dal/getOrders"

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
    const orders = await getOrders()

    return {
        props: {
            initialOrders: orders,
        },
    }
}
