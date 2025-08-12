import prismaClient from "../../prisma";

interface Transaction{
    id: string;
    user_id: string
}

class DeleteTransactionService{
    async execute({id,user_id}:Transaction){

        const transaction = await prismaClient.transaction.delete({
            where:{
                id,
                userId: user_id
            }
        })

        return transaction
        
    }
}

export {DeleteTransactionService}