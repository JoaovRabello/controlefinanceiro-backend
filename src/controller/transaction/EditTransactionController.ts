import { Request, Response } from "express";
import { EditTransactionService } from "../../service/transaction/EditTransactionService";

class EditTransactionController {
    
    async handle(req: Request, res: Response) {
        const { id, title, amount } = req.body
        const user_id = req.user_id

        const editTransactionController = new EditTransactionService()

        const transaction = await editTransactionController.execute({id,user_id,title,amount})

        res.json(transaction)
    }
}

export {EditTransactionController}