import "@/styles/globals.css"
import type { AppProps } from "next/app"
import Navbar from "@/components/navbar/Navbar"
import TopPanel from "@/components/top-panel/TopPanel"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { useRouter } from "next/router"

export default function App({ Component, pageProps }: AppProps) {
    const router = useRouter()
    const queryClient = new QueryClient()

    // Don't apply the layout to the 404 page
    // https://github.com/vercel/next.js/discussions/37311#discussioncomment-2851217
    if (router.pathname === "/404") {
        return <Component {...pageProps} />
    }

    return (
        <QueryClientProvider client={queryClient}>
            <div className="w-full h-full flex flex-col">
                <div className="basis-20 shrink-0 grow-0">
                    <TopPanel />
                </div>
                <div className="grow flex flex-row">
                    <div className="basis-[12em] shrink-0 grow-0">
                        <Navbar />
                    </div>
                    <div className="grow">
                        <Component {...pageProps} />
                    </div>
                </div>
            </div>
        </QueryClientProvider>
    )
}
