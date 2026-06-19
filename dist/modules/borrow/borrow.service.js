"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.borrowService = void 0;
const appError_1 = __importDefault(require("../../error/appError"));
const books_model_1 = __importDefault(require("../books/books.model"));
const borrow_model_1 = __importDefault(require("./borrow.model"));
const borrowBook = async (payload) => {
    const { book: bookId, quantity } = payload;
    const book = await books_model_1.default.findById(bookId);
    if (!book) {
        throw new appError_1.default(404, "book is not found");
    }
    ;
    if (!book.available) {
        throw new appError_1.default(404, "Book is not available");
    }
    ;
    if (Number(book.copies) < quantity)
        throw new appError_1.default(404, "not enough copies available");
    // Deduct copies
    book.copies = Number(book.copies) - quantity;
    // Instance method
    book.updateAvailability();
    await book.save();
    const result = await borrow_model_1.default.create(payload);
    return result;
};
const getBorrowedBooksSummary = async () => {
    const result = await borrow_model_1.default.aggregate([
        {
            $group: {
                _id: "$book",
                totalQuantity: {
                    $sum: "$quantity",
                },
            },
        },
        {
            $lookup: {
                from: "books",
                localField: "_id",
                foreignField: "_id",
                as: "book",
            },
        },
        {
            $unwind: "$book",
        },
        {
            $project: {
                _id: 0,
                book: {
                    title: "$book.title",
                    isbn: "$book.isbn",
                },
                totalQuantity: 1,
            },
        },
    ]);
    return result;
};
exports.borrowService = {
    borrowBook,
    getBorrowedBooksSummary
};
