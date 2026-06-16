"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.borrowController = void 0;
const catchAsync_1 = require("../../utils/catchAsync");
const borrow_service_1 = require("./borrow.service");
const sendResponse_1 = require("../../utils/sendResponse");
const borrowBook = (0, catchAsync_1.catchAsync)(async (req, res) => {
    const result = await borrow_service_1.borrowService.borrowBook(req.body);
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: 201,
        success: true,
        message: "Book borrowed Successfully",
        data: result
    });
});
exports.borrowController = {
    borrowBook
};
