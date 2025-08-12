"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EditTransactionController = void 0;
const EditTransactionService_1 = require("../../service/transaction/EditTransactionService");
class EditTransactionController {
    handle(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id, title, amount } = req.body;
            const user_id = req.user_id;
            const editTransactionController = new EditTransactionService_1.EditTransactionService();
            const transaction = yield editTransactionController.execute({ id, user_id, title, amount });
            res.json(transaction);
        });
    }
}
exports.EditTransactionController = EditTransactionController;
