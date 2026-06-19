
import AppError from "../../error/appError";
import Book from "../books/books.model";
import { IBorrow } from "./borrow.interface";
import Borrow from "./borrow.model";


const borrowBook = async (payload: IBorrow) => {
    const { book: bookId, quantity } = payload;
    const book = await Book.findById(bookId);
    if (!book) {
        throw new AppError(404, "book is not found")
    };
    if (!book.available) {
        throw new AppError(404, "Book is not available")
    };
    if (Number(book.copies) < quantity) throw new AppError(404, "not enough copies available");
    // Deduct copies
    book.copies = Number(book.copies) - quantity;

    // Instance method
    book.updateAvailability();

    await book.save();

    const result = await Borrow.create(payload);

    return result;
}


const getBorrowedBooksSummary = async () => {
    const result = await Borrow.aggregate([
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

export const borrowService = {
    borrowBook,
    getBorrowedBooksSummary
}