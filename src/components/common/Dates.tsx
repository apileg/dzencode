const Dates = ({ timestamp }: { timestamp: number }) => {
    const createdAtDate = new Date(timestamp * 1000)

    const locale = [navigator.language]

    const formattedDayMonthYear = new Intl.DateTimeFormat(locale, {
        day: "numeric",
        month: "short",
        year: "numeric",
    }).format(createdAtDate)

    const formattedMonthYear = new Intl.DateTimeFormat(locale, {
        month: "numeric",
        year: "numeric",
    }).format(createdAtDate)

    return (
        <div className="flex flex-col items-center tracking-wide">
            <p className="text-xs text-[#9fb0b7]">
                {formattedMonthYear.split("/").join(" / ")}
            </p>
            <p>{formattedDayMonthYear.split(" ").join(" / ")}</p>
        </div>
    )
}

export default Dates
