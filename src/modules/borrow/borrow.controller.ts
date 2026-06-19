import { catchAsync } from "../../utils/catchAsync";
import { Request, Response } from "express";
import { borrowService } from "./borrow.service";
import { sendResponse } from "../../utils/sendResponse";


const borrowBook = catchAsync(async (req: Request,
    res: Response) => {
    const result = await borrowService.borrowBook(req.body);
    sendResponse(res, {
        statusCode: 201,
        success: true,
        message: "Book borrowed Successfully",
        data: result
    })
})

const getBorrowedBooksSummary = catchAsync(
  async (req: Request, res: Response) => {
    const result = await borrowService.getBorrowedBooksSummary();

    sendResponse(res, {
      success: true,
      statusCode: 200,
      message: "Borrowed books summary retrieved successfully",
      data: result,
    });
  }
);

export const borrowController = {
    borrowBook,
    getBorrowedBooksSummary
}