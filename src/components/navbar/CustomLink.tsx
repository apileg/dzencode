import { ReactNode } from "react"
import Link from "next/link"
import { useRouter } from "next/router"

export interface CustomLinkProps {
    href: string
    children: ReactNode
}

export default function CustomLink({ href, children }: CustomLinkProps) {
    const router = useRouter()
    const isActive = router.pathname === href

    return (
        <Link href={href}>
            <h1
                className={
                    isActive
                        ? "underline decoration-green-500 decoration-solid decoration-4"
                        : ""
                }>
                {children}
            </h1>
        </Link>
    )
}
