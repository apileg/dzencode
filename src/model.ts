export type Timestamp = number

export interface Order {
    id: number
    title: string
    createdAt: Timestamp

    productsCount: number

    totalUsd: number
    totalUah: number
}

export interface SlimOrder {
    title: string
    guaranteeStart: Timestamp
    guaranteeEnd: Timestamp
}

export type ProductAvailability = "available" | "inMaintenance"
export type UsedOrNew = "used" | "new"

export interface SlimProduct {
    id: number
    title: string
    serialNumber: string
    availability: ProductAvailability
}

export interface Product {
    id: number
    title: string
    serialNumber: string

    availability: ProductAvailability
    usedOrNew: UsedOrNew

    imageUrl: string
    type: string

    guaranteeEnd: Timestamp

    priceUsd: number
    priceUah: number

    groupName: string
    customerFullName: string

    order: SlimOrder
}
