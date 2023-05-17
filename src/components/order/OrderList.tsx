import { Order, Product } from "@/model"
import { useMutation, useQuery } from "@tanstack/react-query"
import { useState } from "react"
import OrderInfo from "./OrderInfo"
import OrderListItem from "./OrderListItem"
import { useOrdersStore } from "./store"

const OrderList = () => {
    const orders = useOrdersStore((store) => store.orders)
    const expandedOrder = useOrdersStore((store) => store.expandedOrder)

    const { data: products } = useQuery({
        queryKey: ["product", expandedOrder],
        queryFn: () => fetchProduct(expandedOrder!.id),
        enabled: expandedOrder !== null,
    })

    const firstColumnSizeClasses =
        expandedOrder === null ? "grow" : "basis-3/4 grow-0"

    return (
        <div className="flex">
            <div className={`flex flex-col ${firstColumnSizeClasses}`}>
                {orders.map((order, index) => (
                    <OrderListItem
                        orderIndex={index}
                        key={order.id}
                        isCurrent={order.id === expandedOrder?.id}
                        isExpanded={expandedOrder !== null}
                    />
                ))}
            </div>
            {products !== undefined && <OrderInfo products={products} />}
        </div>
    )
}

export default OrderList

const fetchProduct = async (id: number): Promise<Product[]> => {
    const response = await fetch(`/api/order/${id}/products`)
    const product = await response.json()

    return product
}
