import { Order } from "@/model"
import { create } from "zustand"

export interface OrdersStore {
    orders: Order[]
    expandedOrder: Order | null

    hydrate(orders: Order[]): void
    removeOrderAt(orderIndex: number): void

    clickOnOrderAt(orderIndex: number): void
    closeCurrentOrder(): void
}

export const useOrdersStore = create<OrdersStore>((set, get) => ({
    orders: [] as Order[],
    expandedOrder: null,

    hydrate: (orders) => set((_state) => ({ orders })),

    removeOrderAt: async (orderIndex) => {
        const order = get().orders[orderIndex]
        await fetch(`/api/order/${order.id}`, { method: "DELETE" })

        set((state) => ({
            orders: state.orders.filter((_, i) => i !== orderIndex),
        }))
    },

    clickOnOrderAt: (orderIndex: number) => {
        const order = get().orders[orderIndex]

        const previouslyExpanded = get().expandedOrder
        const newExpanded = previouslyExpanded?.id === order.id ? null : order

        set((state) => ({
            orders: state.orders,
            expandedOrder: newExpanded,
        }))
    },

    closeCurrentOrder: () => {
        set((state) => ({
            orders: state.orders,
            expandedOrder: null,
        }))
    },
}))
