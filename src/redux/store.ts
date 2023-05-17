import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit"
import { HYDRATE, createWrapper } from "next-redux-wrapper"
import { ordersSlice } from "./ordersSlice"

const makeStore = () =>
    configureStore({
        reducer: {
            [ordersSlice.name]: ordersSlice.reducer,

            [HYDRATE]: (state: object, action) => {
                return { ...state, ...action.payload }
            },
        },
    })

export type AppStore = ReturnType<typeof makeStore>
export type AppState = ReturnType<AppStore["getState"]>

export const wrapper = createWrapper<AppStore>(makeStore)
