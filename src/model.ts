import { ProductAvailabilityEnum, UsedOrNewEnum } from "@prisma/client"

export type Timestamp = number

export interface PlainUser {
    // Add this property so that UserEntity cannot be assigned to PlainUser
    // It's unsafe to assign `serEntity to PlainUser, since entity contains
    // sensitive information
    _type: "plainUser"

    id: number
    avatarUrl: string
}

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
