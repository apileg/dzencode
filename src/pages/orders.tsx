export default function Home() {
    return (
        <div className="w-full h-full pt-24 pl-28 pr-28 pb-28">
            <div className="flex items-center gap-3 stroke-green-500">
                <OrderCount />
            </div>
            <div className="pt-10"></div>
        </div>
    )
}

const OrderCount = () => {
    return (
        <>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                className="w-10 h-10 cursor-pointer">
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                />
            </svg>
            <h1 className="font-medium text-2xl tracking-widest">
                Orders / ordersCount
            </h1>
        </>
    )
}
