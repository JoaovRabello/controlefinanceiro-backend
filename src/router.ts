import { Router } from "express"
import { CreateUserController } from "./controller/user/CreateUserController"
import { AuthUserController } from "./controller/user/AuthUserController"
import { isAuthenticated } from "./middlewares/isAuthenticated"
import { DetailUserController } from "./controller/user/DetailUserController"
import { CreateTransactionController } from "./controller/transaction/CreateTransactionController"
import { ListTransactionController } from "./controller/transaction/ListTransactionController"
import { DeleteTransactionController } from "./controller/transaction/DeleteTransactionController"
import { EditTransactionController } from "./controller/transaction/EditTransactionController"

const router = Router()


// USER
router.post("/user", new CreateUserController().handle)
router.post("/session", new AuthUserController().handle)
router.get("/me", isAuthenticated, new DetailUserController().handle)

//TRANSACTION
router.post("/transaction", isAuthenticated, new CreateTransactionController().handle )
router.get("/transaction", isAuthenticated, new ListTransactionController().handle)
router.delete("/transaction", isAuthenticated, new DeleteTransactionController().handle)
router.put("/transaction", isAuthenticated, new EditTransactionController().handle)

export { router }