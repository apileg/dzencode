import { Product } from "@/model"
import { useEffect } from "react"
import Availability from "../common/Availability"
import ClientSide from "../common/ClientSide"
import Dates from "../common/Dates"
import Dot from "../common/DotIcon"
import Prices from "../common/Prices"
import TrashIcon from "../common/TrashIcon"
import DropDownMenu from "./DropDownMenu"
import styles from "./ProductsPage.module.css"
import { useProductsStore } from "./store"
import { useMutation } from "@tanstack/react-query"

export interface ProductsPageProps {
    initialProducts: Product[]
}

const ProductsPage = ({ initialProducts }: ProductsPageProps) => {
    const hydrate = useProductsStore((store) => store.hydrate)

    useEffect(() => {
        hydrate(initialProducts)
    }, [])

    return (
        <div className="w-full h-full p-20">
            <div className="flex gap-8 items-center">
                <ProductsCount />
                <ProductsFilter />
            </div>
            <div className="pt-10">
                <ProductsTable />
            </div>
        </div>
    )
}

export default ProductsPage

const ProductsCount = () => {
    const count = useProductsStore((store) => store.products.length)

    return (
        <>
            <h1 className="font-medium text-2xl tracking-widest">
                Products / {count}
            </h1>
        </>
    )
}

const ProductsFilter = () => {
    return (
        <div className="flex gap-5">
            <div className="flex items-center">
                <p className="text-[#859ca7] text-sm">Type:</p>
                <DropDownMenu />
            </div>
        </div>
    )
}

const ProductsTable = () => {
    const products = useProductsStore((store) => store.products)

    return (
        <div className={styles.fitWidth}>
            <table className={styles.productsTable}>
                <tbody>
                    {products.map((p, i) => (
                        <ProductsRow key={p.id} product={p} index={i} />
                    ))}
                </tbody>
            </table>
        </div>
    )
}

interface ProductsRowProps {
    product: Product
    index: number
}

const ProductsRow = ({ product, index }: ProductsRowProps) => {
    const deleteProduct = useProductsStore((store) => store.deleteProduct)

    const removeMutation = useMutation({
        mutationKey: ["removeProduct", product.id],
        mutationFn: () => deleteProduct(product.id),
    })

    const stroke = index % 2 === 0 ? "stroke-[#cddc39]" : "stroke-[#2c3c44]"
    const fill = index % 2 === 0 ? "fill-[#cddc39]" : "fill-[#2c3c44]"

    return (
        <tr>
            <td>
                <Dot stroke={stroke} fill={fill} />
            </td>
            <td>
                <div className="h-12 w-12">
                    <img src={product.imageUrl} />
                </div>
            </td>
            <td>
                <p className="text-[#2e3e45] underline decoration-[#dcdedf] decoration-2">
                    {product.title}
                </p>
                <p className="text-[#93a6b0] text-sm">{product.serialNumber}</p>
            </td>
            <td>
                <Availability value={product.availability} />
            </td>
            <td>
                <div className="flex flex-col">
                    <ClientSide>
                        <GuaranteeFromTo timestamp={product.guaranteeEnd} />
                    </ClientSide>
                </div>
            </td>
            <td>
                <p className="text-sm text-[#2e3e45]">{product.usedOrNew}</p>
            </td>
            <td className="text-[#2e3e45]">
                <Prices
                    priceUah={product.priceUah}
                    priceUsd={product.priceUsd}
                />
            </td>
            <td>
                <p className="text-sm text-[#2e3e45]">{product.groupName}</p>
            </td>
            <td>
                <p className="text-sm text-[#2e3e45]">
                    {product.customerFullName}
                </p>
            </td>
            <td>
                <p className="text-sm text-[#2e3e45]">{product.order.title}</p>
            </td>
            <td className="text-sm text-[#2e3e45]">
                <ClientSide>
                    <Dates timestamp={product.order.createdAt} />
                </ClientSide>
            </td>
            <td>
                <TrashIcon onClick={removeMutation.mutate} />
            </td>
        </tr>
    )
}

const GuaranteeFromTo = ({ timestamp }: { timestamp: number }) => {
    const createdAtDate = new Date(timestamp * 1000)

    const locale = [navigator.language]

    const formattedDayMonthYear = new Intl.DateTimeFormat(locale, {
        day: "numeric",
        month: "numeric",
        year: "numeric",
    }).format(createdAtDate)

    const htmlFormat = formattedDayMonthYear.split("/").join(" / ")

    return (
        <>
            <div className="flex gap-3 text-[#93a6b0] items-center">
                <p className="text-sm">from:</p>
                <p className="text-[#2e3e45] text-sm">{htmlFormat}</p>
            </div>
            <div className="flex gap-3 text-[#93a6b0] items-center">
                <p className="text-sm">to:</p>
                <p className="text-[#2e3e45] text-sm">{htmlFormat}</p>
            </div>
        </>
    )
}
