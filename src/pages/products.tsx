import ProductsPage, {
    ProductsPageProps,
} from "@/components/products/ProductsPage"

import { prisma } from "@/prisma"
import { GetServerSideProps } from "next"

export default function Home(props: ProductsPageProps) {
    return <ProductsPage {...props} />
}

export const getServerSideProps: GetServerSideProps<
    ProductsPageProps
> = async () => {
    const entities = await prisma.productEntity.findMany({
        include: {
            order: true,
        },
    })

    return {
        props: {
            initialProducts: entities,
        },
    }
}
