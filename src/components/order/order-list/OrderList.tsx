import { Order, Product } from "@prisma/client"
import { useState } from "react"
import OrderListItem from "./OrderListItem"
import OrderInfo from "../order-info/OrderInfo"
import { products } from "@/mock-data/products"

interface OrderListProps {
    orders: Order[]
}

const OrderList = ({ orders }: OrderListProps) => {
    const [expandedOrderId, setExpandedOrderId] = useState<number | null>(null)
    const [isExpanded, setIsExpanded] = useState<boolean>(false)
    //TODO: isExpanded to localstorage
    const showInfo = (order: Order) => {
        setExpandedOrderId(order.id)
        setIsExpanded(true)
    }

    // add flex style
    return (
        <div className="flex">
            <div className="flex flex-col shrink grow">
                {orders.map((el) => (
                    //TODO: change key
                    <OrderListItem
                        order={el}
                        key={el.title}
                        onClick={() => showInfo(el)}
                        isCurrent={el.id === expandedOrderId}
                        isExpanded={isExpanded}
                    />
                ))}
            </div>
            <div className="flex flex-col shrink-0 grow-0">
                {expandedOrderId !== null && isExpanded ? (
                    <OrderInfo
                        orderTitle={
                            orders.find((order) => order.id === expandedOrderId)
                                ?.title!
                        }
                        products={products}
                    />
                ) : null}
            </div>
        </div>
    )
}

export default OrderList
