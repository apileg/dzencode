import { Product } from "@/model"
import { create } from "zustand"

export interface ProductsStore {
    products: Product[]
    currentType: string | null
    types: string[]

    updateProducts(products: Product[]): void
    removeProductAt(productIndex: number): void

    setCurrentType(value: string | null): void

    updateTypes(types: string[]): void
}

export const useProductsStore = create<ProductsStore>((set, get) => ({
    products: [],
    currentType: null,
    types: [],

    updateProducts: (products) => set(() => ({ products })),

    removeProductAt: async (productIndex) => {
        const store = get()
        const product = store.products[productIndex]

        const response = await fetch(`/api/product/${product.id}`, {
            method: "DELETE",
        })

        if (!response.ok) {
            return
        }

        if (shouldResetCurrentTypeAfterDelete(store, productIndex)) {
            set(() => ({
                currentType: null,
            }))
        }

        set((state) => ({
            products: state.products.filter((_, i) => i !== productIndex),
        }))
    },

    setCurrentType: (value) => {
        set(() => ({
            currentType: value,
        }))
    },

    updateTypes: (types) => {
        set(() => ({ types }))
    },
}))

function shouldResetCurrentTypeAfterDelete(
    store: ProductsStore,
    productToDeleteIndex: number
): boolean {
    const productToDelete = store.products[productToDeleteIndex]

    if (store.currentType !== productToDelete.type) {
        return false
    }

    const countOfProductsWithCurrentType = store.products.filter(
        (p) => p.type === store.currentType
    ).length

    return countOfProductsWithCurrentType === 1
}

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

export async function fetchTypes(): Promise<string[]> {
    const response = await fetch("/api/products/types")
    const types = response.json()

    return types
}
