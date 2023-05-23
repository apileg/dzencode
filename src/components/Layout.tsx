import { ReactNode } from "react"
import TopPanel from "./top-panel/TopPanel"
import Navbar from "./navbar/Navbar"

const Layout = ({
    children,
    avatarUrl,
}: {
    children: ReactNode
    avatarUrl: string
}) => {
    return (
        <div className="w-full h-full flex flex-col">
            <div className="basis-20 shrink-0 grow-0">
                <TopPanel />
            </div>
            <div className="grow flex flex-row">
                <div className="basis-[12em] shrink-0 grow-0">
                    <Navbar avatarUrl={avatarUrl} />
                </div>
                <div className="grow">{children}</div>
            </div>
        </div>
    )
}

export default Layout
