import { Product } from "@/model"
import { create } from "zustand"

export interface ProductsStore {
    products: Product[]
    currentType: string | null
    types: string[]
    lastError: any | null

    updateProducts(products: Product[]): void
    removeProductAt(productIndex: number): void

    setCurrentType(value: string | null): void

    updateTypes(types: string[]): void
}

export const useProductsStore = create<ProductsStore>((set, get) => ({
    products: [],
    currentType: null,
    types: [],
    lastError: null,

    updateProducts: (products) => set(() => ({ products })),

    removeProductAt: async (productIndex) => {
        const store = get()
        const product = store.products[productIndex]

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

    const response = await fetch(`/api/products?${searchParams.toString()}`, {
        credentials: "include",
    })

    const products = await response.json()
    return products
}

export async function fetchTypes(): Promise<string[]> {
    const response = await fetch("/api/products/types", {
        credentials: "include",
    })

    const types = response.json()
    return types
}
