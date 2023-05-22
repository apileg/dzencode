import Layout from "@/components/Layout"
import "@/styles/globals.css"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import type { AppProps } from "next/app"
import { useRouter } from "next/router"
import { trpc } from "@/utils/trpc"

function App({ Component, pageProps }: AppProps) {
    const router = useRouter()
    const queryClient = new QueryClient()

    let content: JSX.Element = <Component {...pageProps} />

    // Don't apply the layout to the 404 and logic pages
    // https://github.com/vercel/next.js/discussions/37311#discussioncomment-2851217

    if (!["/404", "/login"].includes(router.pathname)) {
        content = <Layout>{content}</Layout>
    }

    return (
        <QueryClientProvider client={queryClient}>
            {content}
        </QueryClientProvider>
    )
}

export default trpc.withTRPC(App)
