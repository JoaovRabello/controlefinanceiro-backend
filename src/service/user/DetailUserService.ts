import prismaClient from "../../prisma"

interface user {
    user_id: string
}

class DetailUserService {
    async execute({ user_id }: user) {

       const user = await prismaClient.user.findFirst({
        where:{
            id: user_id
        },
        select:{
            id: true,
            name: true,
            email:true,
        }
       })

       return user
    }
}

export { DetailUserService }