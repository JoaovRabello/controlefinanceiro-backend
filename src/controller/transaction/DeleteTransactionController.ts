import { Request, Response } from "express";
import { DeleteTransactionService } from "../../service/transaction/DeleteTransactionService";

class DeleteTransactionController{
    async handle(req:Request,res:Response){

        const id = req.query.id as string

        const user_id = req.user_id

        const deleteTransactionService = new DeleteTransactionService()

        const transaction = await deleteTransactionService.execute({user_id, id})

        res.json(transaction)

    }
}

export {DeleteTransactionController}