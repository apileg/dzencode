import { Product } from "@/model"
import { create } from "zustand"

export interface ProductsStore {
    products: Product[]
    currentType: string | null

    updateProducts(products: Product[]): void
}

export const useProductsStore = create<ProductsStore>((set) => ({
    products: [],
    currentType: null,

    updateProducts: (products) => set(() => ({ products })),
}))

export async function fetchProductsWithType(
    type: string | null
): Promise<Product[]> {
    const searchParams = new URLSearchParams()

    if (type !== null) {
        searchParams.set("type", type)
    }

    const response = await fetch(`/api/products?${searchParams.toString()}`)
    const products = await response.json()

    return products
}
