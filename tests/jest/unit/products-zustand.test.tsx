/**
 * @jest-environment jsdom
 */

import { ProductsStore, useProductsStore } from "@/components/products/store"
import { Product } from "@/model"
import { renderHook, waitFor } from "@testing-library/react"
import { act } from "react-dom/test-utils"

const initialState = useProductsStore.getState()

beforeEach(() => {
    useProductsStore.setState(initialState)
})

const renderUseProductsStore = () => renderHook(() => useProductsStore())

const type = "Laptop"

const products: Product[] = [
    {
        id: 1,
        title: "Laptop 1",
        serialNumber: "ABC123",
        availability: "Available",
        usedOrNew: "Used",
        imageUrl: "https://example.com/laptop1.jpg",
        type,
        guaranteeEnd: 3555555,
        priceUsd: 1000,
        priceUah: 25000,
        groupName: "Electronics",
        customerFullName: "John Doe",
        order: {
            title: "Order 1",
            createdAt: 3444444,
        },
    },
    {
        id: 2,
        title: "Laptop 2",
        serialNumber: "XYZ789",
        availability: "Available",
        usedOrNew: "New",
        imageUrl: "https://example.com/laptop2.jpg",
        type,
        guaranteeEnd: 3555555,
        priceUsd: 800,
        priceUah: 20000,
        groupName: "Electronics",
        customerFullName: "Jane Smith",
        order: {
            title: "Order 2",
            createdAt: 3444444,
        },
    },
]

test("initial state is empty", async () => {
    const { result } = renderUseProductsStore()

    await waitFor(() => {
        expect(result.current).toMatchObject<Partial<ProductsStore>>({
            products: [],
        })
    })
})

describe("removeProductAt", () => {
    test("should remove one", async () => {
        const { result } = renderUseProductsStore()

        act(() => {
            result.current.updateProducts(products)
        })

        await waitFor(() => {
            expect(result.current).toMatchObject({
                products,
            })
        })

        act(() => {
            result.current.removeProductAt(products[0].id)
        })

        await waitFor(() => {
            expect(result.current.products).toHaveLength(1)
        })
    })

    test("should reset current type after delete", async () => {
        const { result } = renderUseProductsStore()

        act(() => {
            result.current.updateProducts(products)
            result.current.setCurrentType(type)
        })

        await waitFor(() => {
            expect(result.current).toMatchObject<Partial<ProductsStore>>({
                products,
                currentType: type,
            })
        })

        act(() => {
            result.current.removeProductAt(0)
            result.current.removeProductAt(0)
        })

        await waitFor(() => {
            expect(result.current.products).toHaveLength(0)
            expect(result.current.currentType).toBe(null)
        })
    })
})
