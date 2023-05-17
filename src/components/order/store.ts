import { Order, Product } from "@/model"
import { create } from "zustand"

export interface OrdersStore {
    orders: Order[]
    expandedOrderIndex: number | null

    hydrate(orders: Order[]): void
    removeOrderAt(orderIndex: number): void

    clickOnOrderAt(orderIndex: number): void
    closeCurrentOrder(): void

    removeProduct(product: Product): void
}

export const useOrdersStore = create<OrdersStore>((set, get) => ({
    orders: [],
    expandedOrderIndex: null,

    hydrate: (orders) => set((_state) => ({ orders })),

    removeOrderAt: async (orderIndex) => {
        const order = get().orders[orderIndex]
        await fetch(`/api/order/${order.id}`, { method: "DELETE" })

        set((state) => ({
            orders: state.orders.filter((_, i) => i !== orderIndex),
        }))
    },

    clickOnOrderAt: (orderIndex: number) => {
        const previousExpandedIndex = get().expandedOrderIndex

        if (previousExpandedIndex === orderIndex) {
            set(() => ({
                expandedOrderIndex: null,
            }))

            return
        }

        set(() => ({
            expandedOrderIndex: orderIndex,
        }))
    },

    closeCurrentOrder: () => {
        set(() => ({
            expandedOrderIndex: null,
        }))
    },

    removeProduct: async (product: Product) => {
        await fetch(`/api/product/${product.id}`, { method: "DELETE" })

        set((state) => ({
            orders: state.orders.map((order, index) => {
                if (index !== state.expandedOrderIndex) {
                    return order
                }

                return {
                    ...order,
                    totalUsd: order.totalUsd - product.priceUsd,
                    totalUah: order.totalUah - product.priceUah,
                    productsCount: order.productsCount - 1,
                }
            }),
        }))
    },
}))

export const fetchProductsByOrderId = async (
    orderId: number
): Promise<Product[]> => {
    const response = await fetch(`/api/order/${orderId}/products`)
    const products = await response.json()

    return products
}
