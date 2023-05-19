import { PostAuthErrors, PostAuthResponseBody } from "@/pages/api/auth"
import { useMutation } from "@tanstack/react-query"
import { useRef, useState } from "react"

const LoginForm = () => {
    const emailRef = useRef<HTMLInputElement>(null)
    const passwordRef = useRef<HTMLInputElement>(null)

    const [error, setError] = useState<PostAuthErrors | null>(null)

    const loginMutation = useMutation({
        //@ts-expect-error Bug in react-query typings
        mutationKey: ["login"],

        mutationFn: () => {
            const email = emailRef.current!.value
            const password = passwordRef.current!.value

            return submitForm({ email, password })
        },

        onSuccess(data, _variables, _context) {
            if (data.type === "ok") {
                return
            }

            setError(data.errors)
        },
    })

    return (
        <div className="w-full h-full flex justify-center">
            <form
                className="h-full flex flex-col justify-center"
                onSubmit={(e) => {
                    e.preventDefault()
                    loginMutation.mutate()
                }}>
                <div className="px-6 min-w-[30rem]">
                    <div className="mb-6">
                        <label
                            htmlFor="email"
                            className="block mb-2 text-sm font-medium text-gray-900">
                            Email
                        </label>
                        <input
                            type="text"
                            id="email"
                            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                            placeholder="apileg@users.noreply.github.com"
                            ref={emailRef}
                        />
                        <p className="text-sm text-red-400 pl-1 pt-1">
                            {error?.email ?? ""}
                        </p>
                    </div>
                    <div className="mb-6">
                        <label
                            htmlFor="password"
                            className="block mb-2 text-sm font-medium text-gray-900 ">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            ref={passwordRef}
                            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 "
                        />
                        <p className="text-sm text-red-400 pl-1 pt-1">
                            {error?.password ?? ""}
                        </p>
                    </div>
                    <button
                        type="submit"
                        className="text-white w-full bg-[#86bc48] hover:bg-[#82b14d] font-medium rounded-lg text-sm px-5 py-2.5 text-center">
                        Login
                    </button>
                </div>
            </form>
        </div>
    )
}

export default LoginForm

const submitForm = async ({
    email,
    password,
}: {
    email: string
    password: string
}) => {
    const response = await fetch("/api/auth", {
        method: "POST",

        headers: {
            "Content-Type": "application/json",
        },

        body: JSON.stringify({
            email,
            password,
        }),
    })

    const body = (await response.json()) as PostAuthResponseBody
    return body
}
