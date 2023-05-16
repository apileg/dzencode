import { Order } from "@prisma/client"
import { useState } from "react"

interface OrderListItemProps {
    order: Order
    isCurrent: boolean
    isExpanded: boolean
    onClick: () => void
}

const OrderListItem = ({
    order: { title, dateTime },
    isCurrent,
    isExpanded,
    onClick,
}: OrderListItemProps) => {
    const IsClicked = ({ clicked }: { clicked: boolean }): JSX.Element => {
        return (
            <>
                {clicked ? (
                    <>
                        <ProductCount productsCount={42} />
                        <DataAndTime dateTime={dateTime} />
                        {isCurrent ? (
                            <>
                                <div className="h-full bg-[#cfd8dc]">{">"}</div>
                            </>
                        ) : null}
                    </>
                ) : (
                    <>
                        <h1 className="underline tracking-widest">{title}</h1>
                        <ProductCount productsCount={42} />
                        <DataAndTime dateTime={dateTime} />
                        <p>$$$$$</p>
                        <p>Trash button</p>
                    </>
                )}
            </>
        )
    }

    return (
        <div className="border-2 solid rounded-md p-3 m-3">
            <div
                className="flex items-center justify-around text-[#135164]"
                onClick={onClick}>
                <IsClicked clicked={isExpanded} />
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

const DataAndTime = ({ dateTime }: { dateTime: number }) => {
    const date = new Date(dateTime * 1000)

    //TODO: if not in useEffect => navigator.language === undefined
    //const locale = [navigator.language]

    const formattedDayMonthYear = new Intl.DateTimeFormat("en-GB", {
        day: "numeric",
        month: "long",
        year: "numeric",
    }).format(date)

    //TODO: this will guarantee start month / guarantee end month format
    const formattedMonthYear = new Intl.DateTimeFormat("en-GB", {
        month: "numeric",
        year: "numeric",
    }).format(date)

    return (
        <div className="flex flex-col items-center tracking-wide">
            <p className="text-xs text-[#9fb0b7]">{formattedMonthYear}</p>
            <p>{formattedDayMonthYear.split(" ").join(" / ")}</p>
        </div>
    )
}
