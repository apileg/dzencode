import { Product } from "@/model"
import TrashIcon from "../common/TrashIcon"
import AddIcon from "../common/AddIcon"
import { useOrdersStore } from "./store"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useExpandedOrder } from "./useExpandedOrder"

interface OrderInfoProps {
    products: Product[]
}

const OrderInfo = ({ products }: OrderInfoProps) => {
    const orderTitle = useOrdersStore((store) => {
        return store.orders[store.expandedOrderIndex!].title
    })

    // See TODO
    // const closeOrder = useOrdersStore(store => store.closeCurrentOrder)

    return (
        <div className="w-full h-full border-2 solid rounded-md p-3 m-3">
            <div className="pt-3 px-3">
                <h1 className="text-left font-medium text-2xl pl-2">
                    {orderTitle}
                </h1>

                <AddProduct />

                <div className="pt-3">
                    {products.map((p) => (
                        <ul key={p.id} className="border-t-2">
                            <li className="p-2">
                                <ProductItem {...p} />
                            </li>
                        </ul>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default OrderInfo

const AddProduct = () => {
    return (
        <div className="flex gap-2 pt-3 pl-[0.3rem] items-center">
            <AddIcon
                className="w-[1.75rem] h-[1.75rem]"
                stroke="stroke-[#9aca6a]"
            />
            <p className="text-md text-[#9aca6a]">Add product</p>
        </div>
    )
}

const ProductItem = (product: Product) => {
    const queryClient = useQueryClient()

    const removeProduct = useOrdersStore((store) => store.removeProduct)
    const expandedOrder = useExpandedOrder()

    const deleteProduct = useMutation({
        mutationKey: ["product", product],
        mutationFn: () => removeProduct(product),

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["orderProducts", expandedOrder!.id],
            })
        },
    })

    const image = (
        // eslint-disable-next-line
        <img src={product.imageUrl} alt="" />
    )

    const availabilityStyles =
        product.availability === "Available"
            ? "text-green-500 text-sm"
            : "text-red-500 text-sm"

    const availabilityText =
        product.availability === "Available" ? "Available" : "In maintenance"

    return (
        <div className="flex items-center justify-between">
            <div className="flex items-center gap-8">
                <Dot />
                <div className="h-10 w-10">{image}</div>
                <div className="text-sm">
                    <p className="text-[#2e3e45] underline decoration-[#dcdedf] decoration-2">
                        {product.title}
                    </p>
                    <p className="text-[#93a6b0]">{product.serialNumber}</p>
                </div>
            </div>

            <p className={availabilityStyles}>{availabilityText}</p>

            <div className="flex justify-around">
                <TrashIcon onClick={deleteProduct.mutate} />
            </div>
        </div>
    )
}

const Dot = () => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            className="w-6 h-6 stroke-[#cddc39] fill-[#cddc39]">
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5.25 7.5A2.25 2.25 0 017.5 5.25h9a2.25 2.25 0 012.25 2.25v9a2.25 2.25 0 01-2.25 2.25h-9a2.25 2.25 0 01-2.25-2.25v-9z"
            />
        </svg>
    )
}
