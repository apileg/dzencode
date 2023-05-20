import { useMutation } from "@tanstack/react-query"
import { useOrdersStore } from "./store"
import ClientSide from "../common/ClientSide"
import Prices from "../common/Prices"
import Dates from "../common/Dates"
import TrashIcon from "../common/icons/TrashIcon"

interface OrderListItemProps {
    orderIndex: number
}

const OrderListItem = ({ orderIndex }: OrderListItemProps) => {
    const expandedOrderIndex = useOrdersStore(
        (store) => store.expandedOrderIndex
    )

    const isExpanded = expandedOrderIndex !== null
    const isCurrent = orderIndex === expandedOrderIndex

    return (
        <div className="border-2 solid rounded-md p-3 m-3">
            <div className="flex items-center justify-around pr-[1%] text-[#135164]">
                {isExpanded ? (
                    <Expanded orderIndex={orderIndex} arrowShown={isCurrent} />
                ) : (
                    <Collapsed orderIndex={orderIndex} />
                )}
            </div>
        </div>
    )
}

export default OrderListItem

interface ExpandedProps {
    orderIndex: number
    arrowShown: boolean
}

// Note: don't define those components inside of <OrderListItem>. This will
// cause flicker on rerender. See:
// https://stackoverflow.com/questions/69306890/rendering-component-in-react-shows-flicker
const Expanded = ({ orderIndex, arrowShown }: ExpandedProps) => {
    const { productsCount, createdAt } = useOrdersStore(
        (store) => store.orders[orderIndex]
    )

    return (
        <>
            <ProductCount
                orderIndex={orderIndex}
                productsCount={productsCount}
            />
            <ClientSide>
                <Dates timestamp={createdAt} />
            </ClientSide>
            <Arrow shown={arrowShown} />
        </>
    )
}

const Arrow = ({ shown }: { shown: boolean }) => {
    return (
        <div className="h-full flex text-xl text-[#cddc39] min-w-[15px]">
            {shown ? ">" : ""}
        </div>
    )
}

interface CollapsedProps {
    orderIndex: number
}

const Collapsed = ({ orderIndex }: CollapsedProps) => {
    const { id, title, productsCount, createdAt, totalUah, totalUsd } =
        useOrdersStore((store) => store.orders[orderIndex])

    const removeOrderById = useOrdersStore((store) => store.removeOrderById)

    const removeMutation = useMutation({
        mutationKey: ["removeOrder", id],

        mutationFn: async () => {
            await fetch(`/api/order/${id}`, {
                method: "DELETE",
                credentials: "include",
            })
        },

        onSuccess(_data, _variables, _context) {
            removeOrderById(id)
        },
    })

    return (
        <>
            <h1 className="underline tracking-widest min-w-max line-clamp-2 text-ellipsis">
                {title}
            </h1>
            <ProductCount
                orderIndex={orderIndex}
                productsCount={productsCount}
            />
            <ClientSide>
                <Dates timestamp={createdAt} />
            </ClientSide>
            <Prices priceUsd={totalUsd} priceUah={totalUah} />
            <TrashIcon onClick={removeMutation.mutate} />
        </>
    )
}

interface ProductCountProps {
    orderIndex: number
    productsCount: number
}

const ProductCount = ({ orderIndex, productsCount }: ProductCountProps) => {
    const clickOnOrderAt = useOrdersStore((store) => store.clickOnOrderAt)

    return (
        <div className="flex items-center">
            <div className="flex items-center w-8 h-8 rounded-full ring-2 ring-gray-400">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    onClick={() => clickOnOrderAt(orderIndex)}
                    viewBox="0 0 24 24"
                    strokeWidth={1.9}
                    stroke="currentColor"
                    className="w-8 h-8 p-1 cursor-pointer">
                    <circle cx="6" cy="7" r="1.35" fill="currentColor" />
                    <circle cx="6" cy="13" r="1.35" fill="currentColor" />
                    <circle cx="6" cy="19" r="1.35" fill="currentColor" />
                    <path
                        d="M10 6h10v2H10zM10 12h10v2H10zM10 18h10v2H10z"
                        fill="currentColor"
                    />
                </svg>
            </div>
            <div className="flex flex-col pl-5">
                <h1 className="text-lg">{productsCount}</h1>
                <p className="text-xs text-[#9fb0b7]">Products</p>
            </div>
        </div>
    )
}
