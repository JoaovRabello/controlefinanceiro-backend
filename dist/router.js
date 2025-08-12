"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const CreateUserController_1 = require("./controller/user/CreateUserController");
const AuthUserController_1 = require("./controller/user/AuthUserController");
const isAuthenticated_1 = require("./middlewares/isAuthenticated");
const DetailUserController_1 = require("./controller/user/DetailUserController");
const CreateTransactionController_1 = require("./controller/transaction/CreateTransactionController");
const ListTransactionController_1 = require("./controller/transaction/ListTransactionController");
const DeleteTransactionController_1 = require("./controller/transaction/DeleteTransactionController");
const EditTransactionController_1 = require("./controller/transaction/EditTransactionController");
const router = (0, express_1.Router)();
exports.router = router;
// USER
router.post("/user", new CreateUserController_1.CreateUserController().handle);
router.post("/session", new AuthUserController_1.AuthUserController().handle);
router.get("/me", isAuthenticated_1.isAuthenticated, new DetailUserController_1.DetailUserController().handle);
//TRANSACTION
router.post("/transaction", isAuthenticated_1.isAuthenticated, new CreateTransactionController_1.CreateTransactionController().handle);
router.get("/transaction", isAuthenticated_1.isAuthenticated, new ListTransactionController_1.ListTransactionController().handle);
router.delete("/transaction", isAuthenticated_1.isAuthenticated, new DeleteTransactionController_1.DeleteTransactionController().handle);
router.put("/transaction", isAuthenticated_1.isAuthenticated, new EditTransactionController_1.EditTransactionController().handle);
