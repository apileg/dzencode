import { createServerSideHelpers } from "@trpc/react-query/server"
import { appRouter } from "@/server/app"

export const helpers = createServerSideHelpers({
    router: appRouter,
    ctx: {},
})
