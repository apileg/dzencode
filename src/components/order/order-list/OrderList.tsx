import { Order, Product } from "@prisma/client"
import { useState } from "react"
import OrderListItem from "./OrderListItem"
import OrderInfo from "../order-info/OrderInfo"
import { products } from "@/mock-data/products"

interface OrderListProps {
    orders: Order[]
}

const OrderList = ({ orders }: OrderListProps) => {
    const [expandedOrder, setExpandedOrder] = useState<Order | null>(null)

    const showInfo = (order: Order) => {
        setExpandedOrder(order)
    }

    // add flex style
    return (
        <div>
            <div>
                {orders.map((el) => (
                    <OrderListItem
                        order={el}
                        key={el.title}
                        onClick={() => showInfo(el)}
                    />
                ))}
            </div>
            <div>
                {expandedOrder !== null ? (
                    <OrderInfo
                        orderTitle={expandedOrder.title}
                        products={products}
                    />
                ) : null}
            </div>
        </div>
    )
}

export default OrderList
