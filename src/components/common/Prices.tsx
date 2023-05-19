const Prices = ({
    priceUsd,
    priceUah,
}: {
    priceUsd: number
    priceUah: number
}) => {
    const usd = Math.round(priceUsd / 100)
    const uah = Math.round(priceUah / 100)

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
