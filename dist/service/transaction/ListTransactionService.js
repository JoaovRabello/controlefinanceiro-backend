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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListTransactionService = void 0;
const prisma_1 = __importDefault(require("../../prisma"));
class ListTransactionService {
    execute(_a) {
        return __awaiter(this, arguments, void 0, function* ({ user_id, date }) {
            const [year, month] = date.split("-");
            const startOfMonth = new Date(Number(year), Number(month) - 1, 1, 0, 0, 0, 0);
            const endOfMonth = new Date(Number(year), Number(month), 0, 23, 59, 59, 999);
            const transaction = yield prisma_1.default.transaction.findMany({
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
            });
            const income = yield prisma_1.default.transaction.aggregate({
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
            });
            const expense = yield prisma_1.default.transaction.aggregate({
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
            });
            const incomeSum = income._sum.amount || 0;
            const expenseSum = expense._sum.amount || 0;
            const total = (incomeSum) - (expenseSum);
            return {
                transaction,
                summary: {
                    income: incomeSum,
                    expense: expenseSum,
                    total
                }
            };
        });
    }
}
exports.ListTransactionService = ListTransactionService;
