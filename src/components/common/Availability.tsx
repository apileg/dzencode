import { ProductAvailabilityEnum } from "@prisma/client"

const Availability = ({ value }: { value: ProductAvailabilityEnum }) => {
    const styles =
        value === "Available"
            ? "text-green-500 text-sm"
            : "text-[#00011c] text-sm"

    const text = value === "Available" ? "Available" : "In maintenance"

    return <p className={styles}>{text}</p>
}

export default Availability
