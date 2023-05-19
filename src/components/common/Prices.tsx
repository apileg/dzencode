import { centsToFloat } from "@/bll/money-conversion"

const Prices = ({
    priceUsd,
    priceUah,
}: {
    priceUsd: number
    priceUah: number
}) => {
    const usd = centsToFloat(priceUsd)
    const uah = centsToFloat(priceUah)

    const inUsd = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
    }).format(usd)

    const inUah = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "UAH",
    }).format(uah)

    return (
        <div className="flex flex-col items-start tracking-wide">
            <p className="text-xs text-[#9fb0b7]">{inUsd}</p>
            <p>{inUah}</p>
        </div>
    )
}

export default Prices
