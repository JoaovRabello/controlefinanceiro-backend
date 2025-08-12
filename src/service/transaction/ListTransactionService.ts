import prismaClient from "../../prisma"

interface Transaction {
    user_id: string,
    date: string;
}

class ListTransactionService {

    async execute({ user_id, date }: Transaction) {

        const [year, month] = date.split("-")

        const startOfMonth = new Date(Number(year), Number(month) - 1, 1, 0, 0, 0, 0)
        const endOfMonth = new Date(Number(year), Number(month), 0, 23, 59, 59, 999)

        const transaction = await prismaClient.transaction.findMany({
            where: {
                userId: user_id,
                date: {
                    gte: startOfMonth,
                    lte: endOfMonth
                }
            },
            orderBy: {
                date: "asc",
            },
        })

        const income = await prismaClient.transaction.aggregate({
            where: {
                userId: user_id,
                type: "INCOME",
                date: {
                    gte: startOfMonth,
                    lte: endOfMonth
                }
            },
            _sum: {
                amount: true
            }
        })

        const expense = await prismaClient.transaction.aggregate({
            where: {
                userId: user_id,
                type: "EXPENSE",
                date: {
                    gte: startOfMonth,
                    lte: endOfMonth
                }
            },
            _sum: {
                amount: true
            }
        })

        const incomeSum = income._sum.amount || 0
        const expenseSum = expense._sum.amount || 0
        const total = (incomeSum) - (expenseSum)

        return {
            transaction,
            summary: {
                income: incomeSum,
                expense: expenseSum,
                total
            }
        }

    }
}

export { ListTransactionService }