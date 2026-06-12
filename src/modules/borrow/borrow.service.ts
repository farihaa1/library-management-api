import { error } from "node:console";
import AppError from "../../error/appError";
import Book from "../books/books.model";
import { IBorrow } from "./borrow.interface";
import { number } from "zod";

const borrowBook = async (payload: IBorrow) => {
    const { book: bookId, quantity } = payload;
    const book = await Book.findById(bookId);
    if (!book) {
        throw new AppError(404, "book is not found")
    };
    if(!book.available){
        throw new AppError(404,"Book is not available")
    };
    if(number(book.copies)<quantity) throw new AppError(404,"not enough copies available");
    // Deduct copies
  Number(book.copies) -= quantity;

  // Instance method
  book.updateAvailability();

  await book.save();

  const result = await Borrow.create(payload);

  return result;
}

export const borrowService = {
    borrowBook
}