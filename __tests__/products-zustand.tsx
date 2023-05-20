import { useProductsStore } from "@/components/products/store"
import fetchMock from "fetch-mock-jest"
import { act, renderHook, waitFor } from "@testing-library/react"
import { Product } from "@/model"

const initialState = useProductsStore.getState()

beforeEach(() => {
    useProductsStore.setState(initialState)
})

afterEach(() => {
    fetchMock.restore()
})

const renderUseOrdersStore = () => renderHook(() => useProductsStore())

test("initial state is empty", async () => {
    const { result } = renderUseOrdersStore()

    await waitFor(() => {
        expect(result.current.products).toMatchObject<Partial<Product>>({
            products: [],
        })
    })
})
