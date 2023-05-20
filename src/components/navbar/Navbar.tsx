import React, { useState } from "react"
import { ReactNode } from "react"
import Link from "next/link"
import { useRouter } from "next/router"
import { useQuery } from "@tanstack/react-query"
import { PlainUser } from "@/model"

const Navbar = () => {
    return (
        <div className="w-full h-full flex flex-col text-center shadow-2xl">
            <div className="basis-[4em] grow-0 shrink-1"></div>

            <div className="px-[2em] shrink-1">
                <Avatar />
            </div>

            <div className="basis-20 grow-0 shrink-1"></div>

            <div className="basis-10 grow-0 shrink-1">
                <Links />
            </div>

            <div className="basis-40 grow-0 shrink-1"></div>
        </div>
    )
}

export default Navbar

const Avatar = () => {
    const { data: user } = useQuery({
        queryKey: ["me"],

        queryFn: async () => {
            const response = await fetch("/api/me", {
                credentials: "include",
            })

            const user = (await response.json()) as PlainUser
            return user
        },
    })

    const avatar = (
        // eslint-disable-next-line @next/next/no-img-element
        <img
            className="rounded-full"
            src={user?.avatarUrl ?? ""}
            alt="Takanaka"
        />
    )

    return (
        <div className="w-full h-fit relative">
            {avatar}
            <span className="absolute bottom-0 right-0 transform translate-y-1/5 w-12 h-12 bg-white shadow-2xl shadow-black rounded-full">
                <div>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor">
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M10.343 3.94c.09-.542.56-.94 1.11-.94h1.093c.55 0 1.02.398 1.11.94l.149.894c.07.424.384.764.78.93.398.164.855.142 1.205-.108l.737-.527a1.125 1.125 0 011.45.12l.773.774c.39.389.44 1.002.12 1.45l-.527.737c-.25.35-.272.806-.107 1.204.165.397.505.71.93.78l.893.15c.543.09.94.56.94 1.109v1.094c0 .55-.397 1.02-.94 1.11l-.893.149c-.425.07-.765.383-.93.78-.165.398-.143.854.107 1.204l.527.738c.32.447.269 1.06-.12 1.45l-.774.773a1.125 1.125 0 01-1.449.12l-.738-.527c-.35-.25-.806-.272-1.203-.107-.397.165-.71.505-.781.929l-.149.894c-.09.542-.56.94-1.11.94h-1.094c-.55 0-1.019-.398-1.11-.94l-.148-.894c-.071-.424-.384-.764-.781-.93-.398-.164-.854-.142-1.204.108l-.738.527c-.447.32-1.06.269-1.45-.12l-.773-.774a1.125 1.125 0 01-.12-1.45l.527-.737c.25-.35.273-.806.108-1.204-.165-.397-.505-.71-.93-.78l-.894-.15c-.542-.09-.94-.56-.94-1.109v-1.094c0-.55.398-1.02.94-1.11l.894-.149c.424-.07.765-.383.93-.78.165-.398.143-.854-.107-1.204l-.527-.738a1.125 1.125 0 01.12-1.45l.773-.773a1.125 1.125 0 011.45-.12l.737.527c.35.25.807.272 1.204.107.397-.165.71-.505.78-.929l.15-.894z"
                        />
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                    </svg>
                </div>
            </span>
        </div>
    )
}

const Links = () => {
    return (
        <div className="w-full h-full flex flex-col font-bold text-lg gap-8">
            <CustomLink href="/orders">ORDERS</CustomLink>
            <CustomLink href="/products">PRODUCTS</CustomLink>
            <CustomLink href="#">USERS</CustomLink>
            <CustomLink href="#">SETTINGS</CustomLink>
        </div>
    )
}

interface CustomLinkProps {
    href: string
    children: ReactNode
}

function CustomLink({ href, children }: CustomLinkProps) {
    const router = useRouter()
    const isActive = router.pathname === href

    return (
        <Link href={href} className="w-full h-full">
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
