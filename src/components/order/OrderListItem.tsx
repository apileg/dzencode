import ClientSide from "@/components/ClientSide"
import { Order } from "@/model"
import TrashIcon from "../common/TrashIcon"

interface OrderListItemProps {
    order: Order
    isCurrent: boolean
    isExpanded: boolean
    onClick: () => void
}

const OrderListItem = ({
    order: { title, productsCount, createdAt, totalUsd, totalUah },
    isCurrent,
    isExpanded,
    onClick,
}: OrderListItemProps) => {
    const Arrow = () => {
        return (
            <div className="h-full flex justify-end items-center text-xl text-[#cddc39]">
                {">"}
            </div>
        )
    }
    const Expanded = () => {
        return (
            <>
                <ProductCount productsCount={productsCount} />
                <ClientSide>
                    <DataAndTime createdAt={createdAt} />
                </ClientSide>
                {isCurrent && <Arrow />}
            </>
        )
    }

    const Collapsed = () => {
        return (
            <>
                <h1 className="underline tracking-widest">{title}</h1>
                <ProductCount productsCount={productsCount} />
                <ClientSide>
                    <DataAndTime createdAt={createdAt} />
                </ClientSide>
                <Prices priceUsd={totalUsd} priceUah={totalUah} />
                <TrashIcon />
            </>
        )
    }
    const Content = isExpanded ? Expanded : Collapsed

    return (
        <div className="border-2 solid rounded-md p-3 m-3">
            <div
                className="flex items-center justify-around text-[#135164]"
                onClick={onClick}>
                <Content />
            </div>
        </div>
    )
}

export default OrderListItem

const ProductCount = ({ productsCount }: { productsCount: number }) => {
    return (
        <div className="flex items-center">
            <div className="flex items-center w-8 h-8 rounded-full ring-2 ring-gray-400">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.9}
                    stroke="currentColor"
                    className="w-8 h-8 p-1">
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
