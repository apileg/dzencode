import { Product } from "@/model"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import AddIcon from "../common/icons/AddIcon"
import Availability from "../common/Availability"
import { useOrdersStore } from "./store"
import { useExpandedOrder } from "./useExpandedOrder"
import Dot from "../common/icons/DotIcon"
import TrashIcon from "../common/icons/TrashIcon"

interface OrderInfoProps {
    products: Product[]
}

const OrderInfo = ({ products }: OrderInfoProps) => {
    const orderTitle = useOrdersStore((store) => {
        return store.orders[store.expandedOrderIndex!].title
    })

    const closeCurrentOrder = useOrdersStore((store) => store.closeCurrentOrder)

    return (
        <div className="w-full h-full border-2 solid rounded-md p-3 m-3">
            <div className="relative">
                <button
                    type="button"
                    className="absolute -top-8 -right-8 border-2 solid drop-shadow-xl bg-white rounded-full text-gray-400 bg-transparent text-sm p-1.5 ml-auto inline-flex items-center ">
                    <svg
                        className="w-5 h-5"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        onClick={closeCurrentOrder}
                        xmlns="http://www.w3.org/2000/svg">
                        <path
                            fillRule="evenodd"
                            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                            clipRule="evenodd"></path>
                    </svg>
                </button>
            </div>
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
        mutationKey: ["removeProductInOrder", product.id],

        mutationFn: async () => {
            await fetch(`/api/product/${product.id}`, {
                method: "DELETE",
                credentials: "include",
            })
        },
        onSuccess: () => {
            removeProduct(product)
            queryClient.invalidateQueries(["orderProducts", expandedOrder!.id])
        },
    })

    const image = (
        // eslint-disable-next-line
        <img src={product.imageUrl} alt="" />
    )

    return (
        <div className="flex items-center justify-between">
            <div className="flex items-center gap-8">
                <Dot stroke="stroke-[#cddc39]" fill="fill-[#cddc39]" />
                <div className="h-10 w-10">{image}</div>
                <div className="text-sm">
                    <p className="text-[#2e3e45] underline decoration-[#dcdedf] decoration-2">
                        {product.title}
                    </p>
                    <p className="text-[#93a6b0]">{product.serialNumber}</p>
                </div>
            </div>

            <Availability value={product.availability} />

            <div className="flex justify-around">
                <TrashIcon onClick={deleteProduct.mutate} />
            </div>
        </div>
    )
}
