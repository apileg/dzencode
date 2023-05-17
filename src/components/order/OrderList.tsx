import { Order, Product } from "@/model"
import { useQuery } from "@tanstack/react-query"
import { useState } from "react"
import OrderInfo from "./OrderInfo"
import OrderListItem from "./OrderListItem"
import { DeleteOrderFn } from "./OrderPage"

interface OrderListProps {
    orders: Order[]
    deleteOrder: DeleteOrderFn
}

const OrderList = ({ orders, deleteOrder }: OrderListProps) => {
    const [expandedOrder, setExpandedOrder] = useState<Order | null>(null)

    const { data: products } = useQuery({
        queryKey: ["product", expandedOrder],
        queryFn: () => fetchProduct(expandedOrder!.id),
        enabled: expandedOrder !== null,
    })

    const showInfo = (order: Order) => {
        if (expandedOrder?.id === order.id) {
            setExpandedOrder(null)
            return
        }

        setExpandedOrder(order)
    }

    const closeMenu = () => {
        setExpandedOrder(null)
    }

    const firstColumnSizeClasses =
        expandedOrder === null ? "grow" : "basis-3/4 grow-0"

    return (
        <div className="flex">
            <div className={`flex flex-col ${firstColumnSizeClasses}`}>
                {orders.map((el) => (
                    <OrderListItem
                        order={el}
                        key={el.id}
                        onClick={() => showInfo(el)}
                        isCurrent={el.id === expandedOrder?.id}
                        isExpanded={expandedOrder !== null}
                        deleteOrder={deleteOrder}
                    />
                ))}
            </div>
            {products !== undefined && (
                <OrderInfo
                    orderTitle={expandedOrder!.title}
                    products={products}
                    onCloseClick={closeMenu}
                />
            )}
        </div>
    )
}

export default OrderList

const fetchProduct = async (id: number): Promise<Product[]> => {
    const response = await fetch(`/api/order/${id}/products`)
    const product = await response.json()

    return product
}
