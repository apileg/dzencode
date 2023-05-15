import "@/styles/globals.css"
import type { AppProps } from "next/app"
import Navbar from "@/components/navbar/Navbar"
import TopPanel from "@/components/top-panel/TopPanel"

export default function App({ Component, pageProps }: AppProps) {
    return (
        <div className="flex h-screen overflow-hidden">
            <div>
                <Navbar />
            </div>
            <div className="relative"></div>
            <TopPanel />
            <Component {...pageProps} />
        </div>
    )
}
