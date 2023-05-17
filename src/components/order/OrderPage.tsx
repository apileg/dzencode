import AddIcon from "@/components/common/AddIcon"
import OrderList from "@/components/order/OrderList"
import { Order } from "@/model"
import { useEffect } from "react"
import { useOrdersStore } from "./store"

export interface OrderPageProps {
    initialOrders: Order[]
}

export type DeleteOrderFn = (order: Order) => void

const OrderPage = ({ initialOrders }: OrderPageProps) => {
    const hydrate = useOrdersStore((store) => store.hydrate)

    useEffect(() => {
        hydrate(initialOrders)
    }, [])

    return (
        <div className="w-full h-full p-20">
            <div className="flex items-center gap-3">
                <OrderCount />
            </div>
            <div className="pt-10">
                <OrderList />
            </div>
        </div>
    )
}

export default OrderPage

const OrderCount = () => {
    const count = useOrdersStore((store) => store.orders.length)

    return (
        <>
            <AddIcon className="w-10 h-10" stroke="stroke-green-500" />
            <h1 className="font-medium text-2xl tracking-widest">
                Orders / {count}
            </h1>
        </>
    )
}
