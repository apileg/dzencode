/**
 * @jest-environment jsdom
 */

import { OrdersStore, useOrdersStore } from "@/components/order/store"
import { Order, Product } from "@/model"
import { act, renderHook, waitFor } from "@testing-library/react"

// Clear Zustand state before each test
// Not like in docs!
// See https://github.com/pmndrs/zustand/issues/905#issuecomment-1096019094

const initialState = useOrdersStore.getState()

beforeEach(() => {
    useOrdersStore.setState(initialState)
})

// Note: you must wrap `useOrdersStore` in lambda,
// because otherwise `result.current` has type `unknown`
const renderUseOrdersStore = () => renderHook(() => useOrdersStore())

test("initial state is empty", async () => {
    const { result } = renderUseOrdersStore()

    await waitFor(() => {
        expect(result.current).toMatchObject<Partial<OrdersStore>>({
            orders: [],
            expandedOrderIndex: null,
        })
    })
})

const orders: Order[] = [
    {
        id: 1,
        title: "Title 1",
        createdAt: 1231231231,

        productsCount: 3,

        totalUsd: 12125,
        totalUah: 12125,
    },
    {
        id: 2,
        title: "Title 1",
        createdAt: 1231231231,

        productsCount: 3,

        totalUsd: 12125,
        totalUah: 12125,
    },
]

test("hydrate should set order and leave expandedOrderIndex unchanged", async () => {
    const { result } = renderUseOrdersStore()

    const initialOrders = orders

    act(() => {
        result.current.hydrate(initialOrders)
    })

    await waitFor(() => {
        expect(result.current).toMatchObject<Partial<OrdersStore>>({
            orders: initialOrders,
            expandedOrderIndex: null,
        })
    })
})

test("removeOrderById should update orders", async () => {
    const { result } = renderUseOrdersStore()
    const initialOrders = orders

    act(() => {
        result.current.hydrate(initialOrders)
    })

    await waitFor(() => {
        expect(result.current.orders).toEqual(initialOrders)
    })

    act(() => {
        result.current.removeOrderById(orders[0].id)
    })

    await waitFor(() => {
        expect(result.current.orders).toHaveLength(1)
    })
})

const products: Product[] = [
    {
        id: 1,
        title: "Laptop 1",
        serialNumber: "ABC123",
        availability: "Available",
        usedOrNew: "Used",
        imageUrl: "https://example.com/laptop1.jpg",
        type: "Laptop",
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
        type: "Laptop",
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

test("removeProduct should update expanded order's total price and products count", async () => {
    const firstOrder = createOrderWithProducts()
    const secondOrder = orders[0]

    const { result } = renderUseOrdersStore()
    await hydrateExpandFirstOrderAndWaitForLoad()

    const product = products[0]

    act(() => {
        result.current.removeProduct(product)
    })

    await waitFor(() => {
        expectFirstOrderToUpdate()
        expectSecondOrderToRemainSame()
    })

    function createOrderWithProducts(): Order {
        return {
            id: 42,

            title: "The answer to all you questions",
            createdAt: 0,

            productsCount: products.length,
            totalUsd: products.reduce((total, p) => total + p.priceUsd, 0),
            totalUah: products.reduce((total, p) => total + p.priceUah, 0),
        }
    }

    async function hydrateExpandFirstOrderAndWaitForLoad() {
        const initialOrders = [firstOrder, secondOrder]

        act(() => {
            result.current.hydrate(initialOrders)
            result.current.clickOnOrderAt(0)
        })

        await waitFor(() => {
            expect(result.current.orders).toEqual(initialOrders)
            expect(result.current.expandedOrderIndex).toBe(0)
        })
    }

    function expectFirstOrderToUpdate() {
        const newFirstOrder = result.current.orders[0]

        expect(newFirstOrder.totalUah).toBe(
            firstOrder.totalUah - product.priceUah
        )
        expect(newFirstOrder.totalUsd).toBe(
            firstOrder.totalUsd - product.priceUsd
        )

        expect(newFirstOrder.productsCount).toBe(firstOrder.productsCount - 1)
    }

    function expectSecondOrderToRemainSame() {
        const newSecondOrder = result.current.orders[1]
        expect(newSecondOrder).toMatchObject(secondOrder)
    }
})

test("clickOnOrderAt: clicking once expands order; clicking twice collapses order", async () => {
    const { result } = renderUseOrdersStore()

    act(() => {
        result.current.hydrate(orders)
    })

    await waitFor(() => {
        expect(result.current.orders).toEqual(orders)
    })

    act(() => {
        result.current.clickOnOrderAt(0)
    })

    await waitFor(() => {
        expect(result.current.expandedOrderIndex).toBe(0)
    })

    act(() => {
        result.current.clickOnOrderAt(1)
    })

    await waitFor(() => {
        expect(result.current.expandedOrderIndex).toBe(1)
    })

    act(() => {
        result.current.clickOnOrderAt(1)
    })

    await waitFor(() => {
        expect(result.current.expandedOrderIndex).toBe(null)
    })
})
