import prismaClient from "../../prisma";

interface Transaction {
    title: string;
    amount: number;
    type: "INCOME" | "EXPENSE";
    date: string;
    category: string
    user_id: string
}

class CreateTransactionService {
    async execute({ title, amount, type, date, category, user_id }: Transaction) {

        const transaction = await prismaClient.transaction.create({
            data: {
                title,
                amount,
                type,
                date: new Date(date),
                category,
                userId: user_id,
            }
        })

        return transaction

    }
}

export { CreateTransactionService }