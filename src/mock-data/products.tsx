import { Product } from "@prisma/client"

export const products: Product[] = [
    {
        id: 1,
        serialNumber: "ABC123",
        imageUrl: "https://example.com/coffee-mug.jpg",
        title: "Coffee Mug",
        isAvailable: true,
        dateTime: 1652620800,
        type: "Kitchenware",
        specification: "A ceramic coffee mug with a glossy finish",
        guaranteeStart: 1652620800,
        guaranteeEnd: 1684156800,
        orderId: 1234,
    },

    {
        id: 2,
        serialNumber: "DEF456",
        imageUrl: "https://example.com/leather-jacket.jpg",
        title: "Leather Jacket",
        isAvailable: false,
        dateTime: 1652620800,
        type: "Clothing",
        specification: "A black leather jacket with a zip-up front",
        guaranteeStart: 1652620800,
        guaranteeEnd: 1684156800,
        orderId: 5678,
    },

    {
        id: 3,
        serialNumber: "GHI789",
        imageUrl: "https://example.com/wireless-earbuds.jpg",
        title: "Wireless Earbuds",
        isAvailable: true,
        dateTime: 1652620800,
        type: "Electronics",
        specification: "Bluetooth earbuds with noise-cancellation",
        guaranteeStart: 1652620800,
        guaranteeEnd: 1684156800,
        orderId: 9012,
    },

    {
        id: 4,
        serialNumber: "JKL012",
        imageUrl: "https://example.com/yoga-mat.jpg",
        title: "Yoga Mat",
        isAvailable: true,
        dateTime: 1652620800,
        type: "Fitness",
        specification: "A non-slip yoga mat with a carrying strap",
        guaranteeStart: 1652620800,
        guaranteeEnd: 1684156800,
        orderId: 3456,
    },

    {
        id: 5,
        serialNumber: "MNO345",
        imageUrl: "https://example.com/board-game.jpg",
        title: "Board Game",
        isAvailable: false,
        dateTime: 1652620800,
        type: "Toys and Games",
        specification: "A strategy board game for 2-4 players",
        guaranteeStart: 1652620800,
        guaranteeEnd: 1684156800,
        orderId: 7890,
    },

    {
        id: 6,
        serialNumber: "PQR678",
        imageUrl: "https://example.com/smartwatch.jpg",
        title: "Smartwatch",
        isAvailable: true,
        dateTime: 1652620800,
        type: "Electronics",
        specification: "A waterproof smartwatch with fitness tracking",
        guaranteeStart: 1652620800,
        guaranteeEnd: 1684156800,
        orderId: 2345,
    },
]
