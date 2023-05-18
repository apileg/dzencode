import ProductsPage, {
    ProductsPageProps,
} from "@/components/products/ProductsPage"

import { getProducts } from "@/dal/getProducts"
import { GetServerSideProps } from "next"

export default function Home(props: ProductsPageProps) {
    return <ProductsPage {...props} />
}

export const getServerSideProps: GetServerSideProps<
    ProductsPageProps
> = async () => {
    const products = await getProducts({})

    return {
        props: {
            initialProducts: products,
        },
    }
}
