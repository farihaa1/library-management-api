
import mongoose from "mongoose";
import AppError from "../../error/appError";
import { IBook } from "./book.interface";
import Book from "./books.model";

const createBookIntoDb = async (payload: IBook) => {
    const data = await Book.create(payload);
    if (!data) throw new AppError(404, "data couldn't saved")
    console.log(data)
    return data;
}

const getBooksFromDB = async (query: Record<string, string>) => {

    const filter = query.filter;
    const sortOrder = query.sort === 'desc' ? -1 : 1;
    const limit = Number(query.limit) || 10;

    const filterQuery = filter ? { genre: filter } : {}
    const books = await Book.find(filterQuery).sort({ createdAt: sortOrder }).limit(limit);

    return books;
}
const getBookByIdFromDB = async (id: string | string[]) => {

    if (!mongoose.Types.ObjectId.isValid(id as string)) {
        throw new AppError(400, "Invalid book ID");
    }

    const result = await Book.findById(id);
    console.log(id)
    if (!result) throw new AppError(404, "Book not found")

    return result;
}
const updateBookFromDB = async (id: string | string[],
    payload: Partial<IBook>
) => {

    if (!mongoose.Types.ObjectId.isValid(id as string)) {
        throw new AppError(400, "Invalid book ID");
    }
    if (payload.copies !== undefined) {
        payload.available = Number(payload.copies) > 0;
    }

    const result = await Book.findByIdAndUpdate(id, payload, {
        new: true,
        runValidators: true,
    });
    console.log(id)
    if (!result) throw new AppError(404, "Book not found")

    return result;
}

export const bookService = {
    createBookIntoDb,
    getBooksFromDB,
    getBookByIdFromDB,
    updateBookFromDB
}