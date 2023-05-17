import { Component, ReactNode } from "react"
import Navbar from "./navbar/Navbar"
import TopPanel from "./top-panel/TopPanel"

const Layout = ({ children }: { children: ReactNode }) => {
    return (
        <div className="w-full h-full flex flex-col">
            <div className="basis-20 shrink-0 grow-0">
                <TopPanel />
            </div>
            <div className="grow flex flex-row">
                <div className="basis-[12em] shrink-0 grow-0">
                    <Navbar />
                </div>
                <div className="grow">{children}</div>
            </div>
        </div>
    )
}

export default Layout
