import { ProductAvailabilityEnum, UsedOrNewEnum } from "@prisma/client"

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

export interface SlimProduct {
    id: number
    title: string
    serialNumber: string
    availability: ProductAvailabilityEnum
}

export interface Product {
    id: number
    title: string
    serialNumber: string

    availability: ProductAvailabilityEnum
    usedOrNew: UsedOrNewEnum

    imageUrl: string
    type: string

    guaranteeEnd: Timestamp

    priceUsd: number
    priceUah: number

    groupName: string
    customerFullName: string

    order: SlimOrder
}
