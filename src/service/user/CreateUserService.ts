import { hash } from "bcryptjs";
import prismaClient from "../../prisma";

interface User {
    name: string;
    email: string
    password: string
}

class CreateUserService {
    async execute({ name, email, password }: User) {

        if (!email) {
            throw new Error("Email incorrect")
        }

        const userAlreadyExists = await prismaClient.user.findFirst({
            where: {
                email: email
            }
        })

        if (userAlreadyExists) {
            throw new Error("User already exists")
        }

        const passwordHash = await hash(password, 8)

        const user = await prismaClient.user.create({
            data: {
                name,
                email,
                password: passwordHash
            }
        })

        return user
    }

}

export { CreateUserService }