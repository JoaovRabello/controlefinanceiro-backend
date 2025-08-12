import { compare } from "bcryptjs";
import prismaClient from "../../prisma";
import { sign } from "jsonwebtoken";

interface User {
    email: string;
    password: string
}


class AuthUserService {
    async execute({ email, password }: User) {

        const user = await prismaClient.user.findFirst({
            where: {
                email
            }
        })

        if (!user) {
            throw new Error("User/Password incorrect")
        }

        const passwordMatch = await compare(password, user.password)

        if (!passwordMatch) {
            throw new Error("User/Password incorrect")
        }

        const token = sign(
            {
                email: user.email,
                name: user.name
            },
            process.env.JWT_SECRET as string,
            {
                subject: user.id,
                expiresIn: "30d"
            }
        )

        return {
            id: user.id,
            name: user.name,
            email: user.email,
            token,
            userCreatedAt: user.created_at
        }

    }
}

export { AuthUserService }