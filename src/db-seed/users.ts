import { UserEntity } from "@prisma/client"

export type MockUser = Omit<UserEntity, "id" | "passwordHash"> & {
    password: string
}

export const users: MockUser[] = [
    {
        email: "a@a.com",
        password: "password",
        avatarUrl: "/photos/takanaka.jpeg",
    },

    {
        email: "takanaka@seychelles.com",
        password: "goblins",
        avatarUrl: "/photos/takanaka.jpeg",
    },
]
