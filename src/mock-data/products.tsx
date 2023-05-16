import { Product } from "@/model"

const imageUrl = "/photos/takanaka.jpeg"

export const products: Product[] = [
    {
        id: 1,
        title: "Product 1",
        serialNumber: "SN001",
        availability: "available",
        usedOrNew: "new",
        imageUrl,
        type: "Type A",
        guaranteeEnd: 172800000,
        priceUsd: 99.99,
        priceUah: 2500,
        groupName: "Group A",
        customerFullName: "John Doe",
        order: {
            title: "Order 1",
            guaranteeStart: 1621296000000,
            guaranteeEnd: 1652832000000,
        },
    },

    {
        id: 2,
        title: "Product 2",
        serialNumber: "SN002",
        availability: "available",
        usedOrNew: "used",
        imageUrl,
        type: "Type B",
        guaranteeEnd: 1814400000,
        priceUsd: 49.99,
        priceUah: 1500,
        groupName: "Group A",
        customerFullName: "Jane Smith",
        order: {
            title: "Order 2",
            guaranteeStart: 1621296000000,
            guaranteeEnd: 1652832000000,
        },
    },
    {
        id: 3,
        title: "Product 3",
        serialNumber: "SN003",
        availability: "inMaintenance",
        usedOrNew: "new",
        imageUrl,
        type: "Type C",
        guaranteeEnd: 1640908800000,
        priceUsd: 149.99,
        priceUah: 4000,
        groupName: "Group B",
        customerFullName: "Bob Johnson",
        order: {
            title: "Order 3",
            guaranteeStart: 1621296000000,
            guaranteeEnd: 1652832000000,
        },
    },

    {
        id: 4,
        title: "Product 4",
        serialNumber: "SN004",
        availability: "available",
        usedOrNew: "used",
        imageUrl,
        type: "Type A",
        guaranteeEnd: 172800000,
        priceUsd: 79.99,
        priceUah: 2000,
        groupName: "Group B",
        customerFullName: "Alice Brown",
        order: {
            title: "Order 4",
            guaranteeStart: 1621296000000,
            guaranteeEnd: 1652832000000,
        },
    },

    {
        id: 5,
        title: "Product 5",
        serialNumber: "SN005",
        availability: "inMaintenance",
        usedOrNew: "new",
        imageUrl,
        type: "Type B",
        guaranteeEnd: 1734302400000,
        priceUsd: 199.99,
        priceUah: 6000,
        groupName: "Group C",
        customerFullName: "David Lee",
        order: {
            title: "Order 5",
            guaranteeStart: 1621296000000,
            guaranteeEnd: 1652832000000,
        },
    },
]
