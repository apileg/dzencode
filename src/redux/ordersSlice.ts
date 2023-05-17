import { Order } from "@/model"
import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { HYDRATE } from "next-redux-wrapper"

export interface OrdersState {
    orders: Order[]
}

export interface DeleteOrderPayload {
    order: Order
}

const initialState: OrdersState = {
    orders: [],
}

export const ordersSlice = createSlice({
    name: "orders",
    initialState,

    reducers: {
        deleteOrder(
            state: OrdersState,
            action: PayloadAction<DeleteOrderPayload>
        ) {
            return {
                orders: state.orders.filter((o) => o !== action.payload.order),
            }
        },
    },
})
