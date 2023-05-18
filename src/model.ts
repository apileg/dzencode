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
    createdAt: Timestamp
}

export interface SlimProduct {
    id: number
    title: string
    serialNumber: string
    availability: ProductAvailabilityEnum
}

export type ProductType = string

export interface Product {
    id: number
    title: string
    serialNumber: string

    availability: ProductAvailabilityEnum
    usedOrNew: UsedOrNewEnum

    imageUrl: string
    type: ProductType

    guaranteeEnd: Timestamp

    priceUsd: number
    priceUah: number

    groupName: string
    customerFullName: string

    order: SlimOrder
}
