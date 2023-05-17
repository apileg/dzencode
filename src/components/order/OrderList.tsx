import { useQuery } from "@tanstack/react-query"
import OrderInfo from "./OrderInfo"
import OrderListItem from "./OrderListItem"
import { useOrdersStore, fetchProductsByOrderId } from "./store"
import { useExpandedOrder } from "./useExpandedOrder"

const OrderList = () => {
    const orders = useOrdersStore((store) => store.orders)
    const expandedOrder = useExpandedOrder()

    const { data: products } = useQuery({
        queryKey: ["orderProducts", expandedOrder?.id],
        queryFn: () => fetchProductsByOrderId(expandedOrder!.id),
        enabled: expandedOrder?.id !== undefined,
    })

    const firstColumnSizeClasses =
        expandedOrder?.id === undefined ? "grow" : "basis-3/4 grow-0"

    return (
        <div className="flex">
            <div className={`flex flex-col ${firstColumnSizeClasses}`}>
                {orders.map((order, index) => (
                    <OrderListItem orderIndex={index} key={order.id} />
                ))}
            </div>
            {products !== undefined && <OrderInfo products={products} />}
        </div>
    )
}

export default OrderList
