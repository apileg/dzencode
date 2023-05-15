import "@/styles/globals.css"
import type { AppProps } from "next/app"
import Navbar from "@/components/navbar/Navbar"
import TopPanel from "@/components/top-panel/TopPanel"

export default function App({ Component, pageProps }: AppProps) {
    return (
        <div className="w-full h-full flex flex-col">
            <div className="basis-20 shrink-0 grow-0">
                <TopPanel />
            </div>
            <div className="grow shrink-1 flex flex-row">
                <div className="basis-[15em] shrink-0 grow-0">
                    <Navbar />
                </div>
                <div className="grow">
                    <Component {...pageProps} />
                </div>
            </div>
        </div>
    )
}
