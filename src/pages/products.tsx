import ProductsPage, {
    ProductsPageProps,
} from "@/components/products/ProductsPage"

import { getProducts } from "@/dal/getProducts"
import { getProductTypes } from "@/dal/getProductTypes"
import { GetServerSideProps } from "next"

export default function Home(props: ProductsPageProps) {
    return <ProductsPage {...props} />
}

export const getServerSideProps: GetServerSideProps<
    ProductsPageProps
> = async () => {
    const products = await getProducts({})
    const types = await getProductTypes()

    return {
        props: {
            initialProducts: products,
            initialTypes: types,
        },
    }
}
