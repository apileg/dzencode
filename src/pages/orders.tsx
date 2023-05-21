import OrderPage, { OrderPageProps } from "@/components/order/OrderPage"
import { getOrders } from "@/dal/getOrders"
import { GetServerSideProps } from "next"
import { getUserFromJwtCookie } from "@/bll/jwt"

export default function Home(props: OrderPageProps) {
    // Make sure that <OrderPage> will never get unmounted. That's
    // because `props` here will contain the list of orders as it was
    // at the moment of the page load. Since that time, the list of orders
    // could have changed, but `props` won't get updated

    // `props` is used only for Zustand initial state

    // That's why Next.js 13 version got `fetch()` instead of getServerSideProps
    return <OrderPage {...props} />
}

export const getServerSideProps: GetServerSideProps<OrderPageProps> = async (
    context
) => {
    const user = getUserFromJwtCookie(context.req)!
    const orders = await getOrders(user.id)

    return {
        props: {
            initialOrders: orders,
        },
    }
}
