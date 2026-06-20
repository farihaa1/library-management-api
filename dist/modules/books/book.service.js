"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.bookService = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const appError_1 = __importDefault(require("../../error/appError"));
const books_model_1 = __importDefault(require("./books.model"));
const createBookIntoDb = async (payload) => {
    const data = await books_model_1.default.create(payload);
    if (!data)
        throw new appError_1.default(404, "data couldn't saved");
    return data;
};
const getBooksFromDB = async (query) => {
    const filter = query.filter;
    const sortOrder = query.sort === 'desc' ? -1 : 1;
    const limit = Number(query.limit) || 10;
    const filterQuery = filter ? { genre: filter } : {};
    const books = await books_model_1.default.find(filterQuery).sort({ createdAt: sortOrder }).limit(limit);
    return books;
};
const getBookByIdFromDB = async (id) => {
    if (!mongoose_1.default.Types.ObjectId.isValid(id)) {
        throw new appError_1.default(400, "Invalid book ID");
    }
    const result = await books_model_1.default.findById(id);
    if (!result)
        throw new appError_1.default(404, "Book not found");
    return result;
};
const updateBookFromDB = async (id, payload) => {
    if (!mongoose_1.default.Types.ObjectId.isValid(id)) {
        throw new appError_1.default(400, "Invalid book ID");
    }
    if (payload.copies !== undefined) {
        payload.available = Number(payload.copies) > 0;
    }
    const result = await books_model_1.default.findByIdAndUpdate(id, payload, {
        new: true,
        runValidators: true,
    });
    if (!result)
        throw new appError_1.default(404, "Book not found");
    return result;
};
const deleteBookFromDB = async (id) => {
    if (!mongoose_1.default.Types.ObjectId.isValid(id)) {
        throw new appError_1.default(400, "Invalid book ID");
    }
    const result = await books_model_1.default.findByIdAndDelete(id);
    if (!result) {
        throw new appError_1.default(404, "Book not found");
    }
    return null;
};
exports.bookService = {
    createBookIntoDb,
    getBooksFromDB,
    getBookByIdFromDB,
    updateBookFromDB,
    deleteBookFromDB
};
