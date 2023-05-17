import { useOrdersStore } from "./store"
import { Order } from "@/model"

export function useExpandedOrder(): Order | null {
    return useOrdersStore((store) => {
        const index = store.expandedOrderIndex

        if (index === null) {
            return null
        }

        return store.orders[index]
    })
}
