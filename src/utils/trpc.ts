import { AppRouter } from "@/server/app"
import { createTRPCNext } from "@trpc/next"
import { httpBatchLink } from "@trpc/client"

export const trpc = createTRPCNext<AppRouter>({
    config(info) {
        return {
            links: [
                httpBatchLink({
                    url: "http://localhost:3000/api/trpc",
                }),
            ],
        }
    },
})
