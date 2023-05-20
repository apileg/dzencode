import { OrdersStore, useOrdersStore } from "@/components/order/store"
import { Order, Product } from "@/model"
import { act, renderHook, waitFor } from "@testing-library/react"
import fetchMock from "fetch-mock-jest"

// Clear Zustand state before each test
// Not like in docs!
// See https://github.com/pmndrs/zustand/issues/905#issuecomment-1096019094

const initialState = useOrdersStore.getState()

beforeEach(() => {
    useOrdersStore.setState(initialState)
})

afterEach(() => {
    fetchMock.restore()
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
            lastError: null,
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

test("hydrate sets orders and leaves expandedOrderIndex unchanged", async () => {
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

describe("remove order by id", () => {
    test("sends request to DELETE /api/order/${id}", async () => {
        const id = 42
        const endpoint = `/api/order/${id}`

        fetchMock.delete(endpoint, 200)

        const { result } = renderUseOrdersStore()

        act(() => {
            result.current.removeOrderById(id)
        })

        await waitFor(() => {
            expect(fetchMock).toHaveFetched(endpoint)
        })
    })

    test("deletes order from state", async () => {
        fetchMock.delete(`/api/order/${orders[0].id}`, 200)

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

    describe("does not change state", () => {
        test("when fetch throws", async () => {
            const message = "Network error"

            fetchMock.delete(`/api/order/${orders[0].id}`, {
                throws: new Error(message),
            })

            await expectRemoveReturnsErrorAndDoesNotChangeState(message)
        })

        test("when status code is not 200", async () => {
            fetchMock.delete(`/api/order/${orders[0].id}`, 418)

            await expectRemoveReturnsErrorAndDoesNotChangeState(
                "Got status: 418"
            )
        })

        async function expectRemoveReturnsErrorAndDoesNotChangeState(
            message: string
        ) {
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
                expect(result.current).toMatchObject<Partial<OrdersStore>>({
                    orders: initialOrders,
                    expandedOrderIndex: null,
                })

                expect(result.current.lastError).toMatchObject({ message })
            })
        }
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

describe("remove product", () => {
    test("sends request to DELETE /api/product/${id}", async () => {
        const product = products[0]
        const endpoint = `/api/product/${product.id}`

        fetchMock.delete(endpoint, 200)

        const { result } = renderHook(() => useOrdersStore())

        act(() => {
            result.current.removeProduct(product)
        })

        await waitFor(() => {
            expect(fetchMock).toHaveFetched(endpoint)
        })
    })

    test("should update expanded order's total price and products count", async () => {
        const firstOrder = createOrderWithProducts()
        const secondOrder = orders[0]

        const { result } = renderUseOrdersStore()
        await hydrateExpandFirstOrderAndWaitForLoad()

        const product = products[0]
        mockDeleteProductEndpoint(product)

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

        function mockDeleteProductEndpoint(product: Product) {
            const endpoint = `/api/product/${product.id}`
            fetchMock.delete(endpoint, 200)
        }

        function expectFirstOrderToUpdate() {
            const newFirstOrder = result.current.orders[0]

            expect(newFirstOrder.totalUah).toBe(
                firstOrder.totalUah - product.priceUah
            )
            expect(newFirstOrder.totalUsd).toBe(
                firstOrder.totalUsd - product.priceUsd
            )

            expect(newFirstOrder.productsCount).toBe(
                firstOrder.productsCount - 1
            )
        }

        function expectSecondOrderToRemainSame() {
            const newSecondOrder = result.current.orders[1]
            expect(newSecondOrder).toMatchObject(secondOrder)
        }
    })

    describe("sets lastError", () => {
        test("when fetch throws", async () => {
            const message = "Error!"
            const product = products[0]

            fetchMock.delete(`/api/product/${product.id}`, {
                throws: new Error(message),
            })

            await expectRemoveReturnsErrorAndDoesNotChangeState(
                product,
                message
            )
        })

        test("when response status is not 200", async () => {
            const product = products[0]
            fetchMock.delete(`/api/product/${product.id}`, 418)

            await expectRemoveReturnsErrorAndDoesNotChangeState(
                product,
                "Got status: 418"
            )
        })

        async function expectRemoveReturnsErrorAndDoesNotChangeState(
            product: Product,
            message: string
        ) {
            const { result } = renderUseOrdersStore()

            act(() => {
                result.current.removeProduct(product)
            })

            await waitFor(() => {
                expect(result.current.lastError).toMatchObject({ message })

                expect(result.current).toMatchObject<Partial<OrdersStore>>({
                    orders: [],
                    expandedOrderIndex: null,
                })
            })
        }
    })
})

describe("on order click", () => {
    test("once", () => {
        const { result } = renderUseOrdersStore()

        act(() => {})
    })
    test("twice", () => {})
})
