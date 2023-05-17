import OrderPage from "@/components/order/OrderPage"
import { getOrders } from "@/dal/getOrders"
import { OrdersState } from "@/redux/ordersSlice"
import { wrapper } from "@/redux/store"
import { connect } from "react-redux"

const Home = () => {
    return <OrderPage />
}

export const getServerSideProps = wrapper.getServerSideProps<OrdersState>(
    (store) =>
        async ({ req, res, ...etc }) => {
            const orders = await getOrders()

            return {
                props: {
                    orders,
                },
            }
        }
)

export default connect((s) => s)(Home)
