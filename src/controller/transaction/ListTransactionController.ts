import { Request, Response } from "express";
import { ListTransactionService } from "../../service/transaction/ListTransactionService";

class ListTransactionController{

    async handle(req:Request,res:Response){

        const date = String(req.query.date)

        const user_id = req.user_id

        const listTransaction = new ListTransactionService()

        const transaction = await listTransaction.execute({user_id, date})

        res.json(transaction)
    }
}

export {ListTransactionController}