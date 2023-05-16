import AddIcon from "@/components/common/AddIcon"
import OrderList from "@/components/order/OrderList"
import { Order } from "@/model"

export interface OrderPageProps {
    orders: Order[]
}

const OrderPage = ({ orders }: OrderPageProps) => {
    return (
        <div className="w-full h-full p-20">
            <div className="flex items-center gap-3">
                <OrderCount value={orders.length} />
            </div>
            <div className="pt-10">
                <OrderList orders={orders} />
            </div>
        </div>
    )
}

export default OrderPage

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
