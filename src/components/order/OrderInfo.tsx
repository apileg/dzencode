import { Product } from "@/model"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import AddIcon from "../common/AddIcon"
import Availability from "../common/Availability"
import Dot from "../common/DotIcon"
import TrashIcon from "../common/TrashIcon"
import { useOrdersStore } from "./store"
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
        mutationKey: ["removeProductInOrder", product.id],
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
