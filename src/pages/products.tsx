import ProductsPage, {
    ProductsPageProps,
} from "@/components/products/ProductsPage"

import { GetServerSideProps } from "next"
import { getUserFromJwtCookie } from "@/bll/jwt"
import { getProducts } from "@/dal/getProducts"
import { getProductTypes } from "@/dal/getProductTypes"

export default function Home(props: ProductsPageProps) {
    return <ProductsPage {...props} />
}

export const getServerSideProps: GetServerSideProps<ProductsPageProps> = async (
    context
) => {
    const user = getUserFromJwtCookie(context.req)!

    const products = await getProducts(user.id)
    const types = await getProductTypes(user.id)

    return {
        props: {
            avatarUrl: user.avatarUrl,
            initialProducts: products,
            initialTypes: types,
        },
    }
}
