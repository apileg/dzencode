import { UserEntity } from "@prisma/client"
import { hashPassword } from "@/bll/hashing"

export async function getUsers(): Promise<Omit<UserEntity, "id">[]> {
    return [
        {
            email: "a@a.com",
            passwordHash: await hashPassword("password"),
            avatarUrl: "/photos/takanaka.jpeg",
        },

        {
            email: "takanaka@seychelles.com",
            passwordHash: await hashPassword("goblins"),
            avatarUrl: "/photos/takanaka.jpeg",
        },
    ]
}
