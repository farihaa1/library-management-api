"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bookController = void 0;
const catchAsync_1 = require("../../utils/catchAsync");
const book_service_1 = require("./book.service");
const sendResponse_1 = require("../../utils/sendResponse");
const createBookIntoDb = (0, catchAsync_1.catchAsync)(async (req, res) => {
    const result = await book_service_1.bookService.createBookIntoDb(req.body);
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: 201,
        success: true,
        message: "Book created successfully",
        data: result
    });
});
const getBooksFromDb = (0, catchAsync_1.catchAsync)(async (req, res) => {
    const result = await book_service_1.bookService.getBooksFromDB(req.query);
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: 201,
        success: true,
        message: "Books retrieved successfully",
        data: result
    });
});
const getBookByIdFromDB = (0, catchAsync_1.catchAsync)(async (req, res) => {
    const { bookId } = req.params;
    const result = await book_service_1.bookService.getBookByIdFromDB(bookId);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        statusCode: 200,
        message: "Book retrieved successfully",
        data: result,
    });
});
const updateBookFromDB = (0, catchAsync_1.catchAsync)(async (req, res) => {
    const { bookId } = req.params;
    const result = await book_service_1.bookService.updateBookFromDB(bookId, req.body);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        statusCode: 200,
        message: "Book updated successfully",
        data: result,
    });
});
const deleteBookFromDB = (0, catchAsync_1.catchAsync)(async (req, res) => {
    const { bookId } = req.params;
    await book_service_1.bookService.deleteBookFromDB(bookId);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        statusCode: 200,
        message: "Book deleted successfully",
        data: null,
    });
});
exports.bookController = {
    createBookIntoDb,
    getBooksFromDb,
    getBookByIdFromDB,
    updateBookFromDB,
    deleteBookFromDB
};
