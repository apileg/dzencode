import { products } from "@/mock-data/products"
import { Order } from "@/model"
import { useState } from "react"
import OrderInfo from "./OrderInfo"
import OrderListItem from "./OrderListItem"

interface OrderListProps {
    orders: Order[]
}

const OrderList = ({ orders }: OrderListProps) => {
    const [expandedOrderId, setExpandedOrderId] = useState<number | null>(null)

    const showInfo = (order: Order) => {
        if (expandedOrderId === order.id) {
            setExpandedOrderId(null)
            return
        }

        setExpandedOrderId(order.id)
    }

    const closeMenu = () => {
        setExpandedOrderId(null)
    }

    const expandedOrderTitle = orders.find(
        (order) => order.id === expandedOrderId
    )?.title

    const firstColumnSizeClasses =
        expandedOrderId === null ? "grow" : "basis-3/4 grow-0"

    return (
        <div className="flex">
            <div
                className={`flex flex-col grow ${firstColumnSizeClasses} cursor-pointer`}>
                {orders.map((el) => (
                    <OrderListItem
                        order={el}
                        key={el.id}
                        onClick={() => showInfo(el)}
                        isCurrent={el.id === expandedOrderId}
                        isExpanded={expandedOrderId !== null}
                    />
                ))}
            </div>
            {expandedOrderId !== null && (
                <OrderInfo
                    orderTitle={expandedOrderTitle!}
                    products={products}
                    onCloseClick={closeMenu}
                />
            )}
        </div>
    )
}

export default OrderList
