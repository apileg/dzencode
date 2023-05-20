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
