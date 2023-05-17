import "@/styles/globals.css"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import type { AppProps } from "next/app"
import { useRouter } from "next/router"
import { wrapper } from "../redux/store"
import Layout from "@/components/Layout"
import { Provider } from "react-redux"

export default function App({ Component, ...rest }: AppProps) {
    const router = useRouter()
    const { store, props } = wrapper.useWrappedStore(rest)
    const queryClient = new QueryClient()

    // Don't apply the layout to the 404 page
    // https://github.com/vercel/next.js/discussions/37311#discussioncomment-2851217
    if (router.pathname === "/404") {
        return <Component {...props.pageProps} />
    }

    return (
        <Provider store={store}>
            <QueryClientProvider client={queryClient}>
                <Layout>
                    <Component {...props.pageProps} />
                </Layout>
            </QueryClientProvider>
        </Provider>
    )
}
