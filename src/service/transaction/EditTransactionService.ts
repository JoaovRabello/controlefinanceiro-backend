import prismaClient from "../../prisma";

interface Transaction {
    id: string;
    user_id: string
    title: string;
    amount: number
}
class EditTransactionService {

    async execute({ id, user_id, title, amount }: Transaction) {

        const transaction = await prismaClient.transaction.update({
            where: {
                id,
                userId: user_id
            },
            data: {
                title,
                amount
            }
        })

        return transaction

    }
}

export { EditTransactionService }