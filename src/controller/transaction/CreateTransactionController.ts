import { Request, Response } from "express";
import { CreateTransactionService } from "../../service/transaction/CreateTransactionService";

class CreateTransactionController {
    async handle(req: Request, res: Response) {

        const { title, amount, type, date, category } = req.body

        const user_id = req.user_id

        const createTransactionService = new CreateTransactionService()

        const transaction = await createTransactionService.execute({ title, amount, type, date, category, user_id })

        res.json(transaction)

    }
}

export { CreateTransactionController }