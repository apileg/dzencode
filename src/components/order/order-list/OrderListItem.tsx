import { Order } from "@prisma/client"

interface OrderListItemProps {
    order: Order
    onClick: () => void
}

const OrderListItem = ({
    order: { title, dateTime, description },
    onClick,
}: OrderListItemProps) => {
    return (
        <div className="border-2 solid rounded-md items-center p-5">
            <div
                className="flex justify-around text-cyan-900 "
                onClick={onClick}>
                <p className="underline tracking-widest items-baseline">
                    {title}
                </p>
                <ProductCount productsCount={42} />
                <p>{dateTime}</p>
                <p>$$$$$</p>
            </div>
        </div>
    )
}

export default OrderListItem

const ProductCount = ({ productsCount }: { productsCount: number }) => {
    return (
        <div className="flex">
            <div className="flex items-center rounded-full ring-2 ring-gray-400">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.9}
                    stroke="currentColor"
                    className="w-6 h-6 p-1">
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
                <p className="text-xs">Products</p>
            </div>
        </div>
    )
}
