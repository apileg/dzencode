import ClientSide from "@/components/ClientSide"
import { Order } from "@/model"
import TrashIcon from "../common/TrashIcon"
import { DeleteOrderFn } from "./OrderPage"

interface OrderListItemProps {
    order: Order
    isCurrent: boolean
    isExpanded: boolean
    onClick: () => void
    deleteOrder: DeleteOrderFn
}

const OrderListItem = ({
    order,
    isCurrent,
    isExpanded,
    onClick,
    deleteOrder,
}: OrderListItemProps) => {
    return (
        <div className="border-2 solid rounded-md p-3 m-3">
            <div className="flex items-center justify-around pr-[1%] text-[#135164]">
                {isExpanded ? (
                    <Expanded
                        productsCount={order.productsCount}
                        createdAt={order.createdAt}
                        arrowShown={isCurrent}
                        onClick={onClick}
                    />
                ) : (
                    <Collapsed
                        order={order}
                        onClick={onClick}
                        deleteOrder={deleteOrder}
                    />
                )}
            </div>
        </div>
    )
}

export default OrderListItem

interface ExpandedProps {
    productsCount: number
    createdAt: number
    arrowShown: boolean
    onClick: () => void
}

// Note: don't define those components inside of <OrderListItem>. This will
// cause flicker on rerender. See:
// https://stackoverflow.com/questions/69306890/rendering-component-in-react-shows-flicker
const Expanded = ({
    productsCount,
    onClick,
    createdAt,
    arrowShown,
}: ExpandedProps) => {
    return (
        <>
            <ProductCount productsCount={productsCount} onClick={onClick} />
            <ClientSide>
                <DataAndTime createdAt={createdAt} />
            </ClientSide>
            {arrowShown && <Arrow />}
        </>
    )
}

const Arrow = () => {
    return <div className="h-full flex text-xl text-[#cddc39]">{">"}</div>
}

interface CollapsedProps {
    order: Order
    onClick: () => void
    deleteOrder: DeleteOrderFn
}

const Collapsed = ({ order, onClick, deleteOrder }: CollapsedProps) => {
    return (
        <>
            <h1 className="underline tracking-widest">{order.title}</h1>
            <ProductCount
                productsCount={order.productsCount}
                onClick={onClick}
            />
            <ClientSide>
                <DataAndTime createdAt={order.createdAt} />
            </ClientSide>
            <Prices priceUsd={order.totalUsd} priceUah={order.totalUah} />
            <TrashIcon onClick={() => deleteOrder(order)} />
        </>
    )
}

const ProductCount = ({
    productsCount,
    onClick,
}: {
    productsCount: number
    onClick: () => void
}) => {
    return (
        <div className="flex items-center">
            <div className="flex items-center w-8 h-8 rounded-full ring-2 ring-gray-400">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    onClick={onClick}
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

const DataAndTime = ({ createdAt }: { createdAt: number }) => {
    const createdAtDate = new Date(createdAt * 1000)

    const locale = [navigator.language]

    const formattedDayMonthYear = new Intl.DateTimeFormat(locale, {
        day: "numeric",
        month: "long",
        year: "numeric",
    }).format(createdAtDate)

    const formattedMonthYear = new Intl.DateTimeFormat(locale, {
        month: "numeric",
        year: "numeric",
    }).format(createdAtDate)

    return (
        <div className="flex flex-col items-center tracking-wide">
            <p className="text-xs text-[#9fb0b7]">{formattedMonthYear}</p>
            <p>{formattedDayMonthYear.split(" ").join(" / ")}</p>
        </div>
    )
}

const Prices = ({
    priceUsd,
    priceUah,
}: {
    priceUsd: number
    priceUah: number
}) => {
    const inUsd = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
    }).format(priceUsd)

    const inUah = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "UAH",
    }).format(priceUah)

    return (
        <div className="flex flex-col items-start tracking-wide">
            <p className="text-xs text-[#9fb0b7]">{inUsd}</p>
            <p>{inUah}</p>
        </div>
    )
}
