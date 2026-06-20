import { Request, Response } from "express"
import { catchAsync } from "../../utils/catchAsync"
import { bookService } from "./book.service"
import { sendResponse } from "../../utils/sendResponse"


const createBookIntoDb = catchAsync(async (req: Request, res: Response) => {
    const result = await bookService.createBookIntoDb(req.body);
   
    sendResponse(res, {
        statusCode: 201,
        success: true,
        message: "Book created successfully",
        data: result
    })
})
const getBooksFromDb = catchAsync(async (req: Request, res: Response) => {
    const result = await bookService.getBooksFromDB(req.query as Record<string, string>)

    sendResponse(res, {
        statusCode: 201,
        success: true,
        message: "Books retrieved successfully",
        data: result
    })
})

const getBookByIdFromDB = catchAsync(async (req: Request, res: Response) => {
    const { bookId } = req.params;

    const result = await bookService.getBookByIdFromDB(bookId);

    sendResponse(res, {
        success: true,
        statusCode: 200,
        message: "Book retrieved successfully",
        data: result,
    });
})

const updateBookFromDB = catchAsync(async (req: Request, res: Response) => {
    const { bookId } = req.params;



    const result = await bookService.updateBookFromDB(bookId, req.body);

    sendResponse(res, {
        success: true,
        statusCode: 200,
        message: "Book updated successfully",
        data: result,
    });
})

const deleteBookFromDB = catchAsync(async (req, res) => {
    const { bookId } = req.params;

    await bookService.deleteBookFromDB(bookId as string);

    sendResponse(res, {
        success: true,
        statusCode: 200,
        message: "Book deleted successfully",
        data: null,
    });
});

export const bookController = {
    createBookIntoDb,
    getBooksFromDb,
    getBookByIdFromDB,
    updateBookFromDB,
    deleteBookFromDB
}
