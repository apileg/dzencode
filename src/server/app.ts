import { router, publicProcedure } from "./trpc"

export const appRouter = router({
    getQuotes: publicProcedure.query(async () => {
        return ["got quotes!", "a", "b", "c"]
    }),
})

export type AppRouter = typeof appRouter
