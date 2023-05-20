import { Order, Product } from "@/model"
import { create } from "zustand"

export interface OrdersStore {
    orders: Order[]
    expandedOrderIndex: number | null
    lastError: any | null

    hydrate(orders: Order[]): void
    removeOrderById(orderId: number): void

    clickOnOrderAt(orderIndex: number): void
    closeCurrentOrder(): void

    removeProduct(product: Product): void
}

export const useOrdersStore = create<OrdersStore>((set, get) => ({
    orders: [],
    expandedOrderIndex: null,
    lastError: null,

    hydrate: (orders) => set(() => ({ orders })),

    removeOrderById: async (orderId) => {
        let response: Response

        try {
            response = await fetch(`/api/order/${orderId}`, {
                method: "DELETE",
                credentials: "include",
            })
        } catch (error) {
            set(() => ({
                lastError: error,
            }))

            return
        }

        if (!response.ok) {
            set(() => ({
                lastError: new Error(`Got status: ${response.status}`),
            }))

            return
        }

        set((state) => ({
            orders: state.orders.filter((o) => o.id !== orderId),
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
        let response: Response

        try {
            response = await fetch(`/api/product/${product.id}`, {
                method: "DELETE",
                credentials: "include",
            })
        } catch (error) {
            set(() => ({
                lastError: error,
            }))

            return
        }

        if (!response.ok) {
            set(() => ({
                lastError: new Error(`Got status: ${response.status}`),
            }))

            return
        }

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
    const response = await fetch(`/api/order/${orderId}/products`, {
        credentials: "include",
    })

    const products = await response.json()
    return products
}
