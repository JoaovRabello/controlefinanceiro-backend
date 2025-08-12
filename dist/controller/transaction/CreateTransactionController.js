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
exports.CreateTransactionController = void 0;
const CreateTransactionService_1 = require("../../service/transaction/CreateTransactionService");
class CreateTransactionController {
    handle(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { title, amount, type, date, category } = req.body;
            const user_id = req.user_id;
            const createTransactionService = new CreateTransactionService_1.CreateTransactionService();
            const transaction = yield createTransactionService.execute({ title, amount, type, date, category, user_id });
            res.json(transaction);
        });
    }
}
exports.CreateTransactionController = CreateTransactionController;
