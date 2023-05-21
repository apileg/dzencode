import { verifyPassword } from "@/bll/hashing"
import { PlainUser } from "@/model"
import { prisma } from "@/prisma"

export type LoginResult =
    | {
          type: "ok"
          user: PlainUser
      }
    | {
          type: "emailNotFound" | "wrongPassword"
      }

export async function tryLogin({
    email,
    password,
}: {
    email: string
    password: string
}): Promise<LoginResult> {
    const model = await prisma.userEntity.findUnique({
        select: {
            id: true,
            avatarUrl: true,
            passwordHash: true,
        },

        where: {
            email,
        },
    })

    if (model === null) {
        return { type: "emailNotFound" }
    }

    const passwordsMatch = await verifyPassword(password, model.passwordHash)

    if (!passwordsMatch) {
        return { type: "wrongPassword" }
    }

    return {
        type: "ok",

        user: {
            _type: "plainUser",
            id: model.id,
            avatarUrl: model.avatarUrl,
        },
    }
}
