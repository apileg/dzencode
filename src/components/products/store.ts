import { Product } from "@/model"
import { create } from "zustand"

export interface ProductsStore {
    products: Product[]
    hydrate(products: Product[]): void
    deleteProduct(productId: number): void
}

export const useProductsStore = create<ProductsStore>((set) => ({
    products: [] as Product[],
    hydrate: (products) => set(() => ({ products })),
    deleteProduct: async (productId) => {
        await fetch(`/api/product/${productId}`, { method: "DELETE" })

        set((state) => ({
            products: state.products.filter((p) => p.id !== productId),
        }))
    },
}))
