import AddIcon from "@/components/common/AddIcon"
import OrderList from "@/components/order/OrderList"
import { Order } from "@/model"
import { useState } from "react"
import { useMutation } from "@tanstack/react-query"

export interface OrderPageProps {
    initialOrders: Order[]
}

export type DeleteOrderFn = (order: Order) => void

const OrderPage = ({ initialOrders }: OrderPageProps) => {
    const [orders, setOrders] = useState<Order[]>(initialOrders)

    const deleteMutation = useMutation({
        mutationFn: deleteOrder,
    })

    const doDeleteOrder = async (order: Order) => {
        await deleteMutation.mutateAsync(order.id)
        setOrders((previous) => previous.filter((o) => o !== order))
    }

    return (
        <div className="w-full h-full p-20">
            <div className="flex items-center gap-3">
                <OrderCount value={orders.length} />
            </div>
            <div className="pt-10">
                <OrderList orders={orders} deleteOrder={doDeleteOrder} />
            </div>
        </div>
    )
}

export default OrderPage

const deleteOrder = async (orderId: number) => {
    await fetch(`/api/order/${orderId}`, { method: "DELETE" })
}

const OrderCount = ({ value }: { value: number }) => {
    return (
        <>
            <AddIcon className="w-10 h-10" stroke="stroke-green-500" />
            <h1 className="font-medium text-2xl tracking-widest">
                Orders / {value}
            </h1>
        </>
    )
}
