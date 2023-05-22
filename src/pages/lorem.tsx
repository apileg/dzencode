import { trpc } from "@/utils/trpc"
import { helpers } from "@/utils/helpers"

export default function Home() {
    const { data: quotes } = trpc.getQuotes.useQuery()

    return (
        <>
            <ul>
                {quotes?.map((q, i) => (
                    <li key={i}>{q}</li>
                ))}
            </ul>
        </>
    )
}

export const getServerSideProps = async () => {
    await helpers.getQuotes.prefetch()

    return {
        props: {
            trpcState: helpers.dehydrate(),
        },
    }
}
