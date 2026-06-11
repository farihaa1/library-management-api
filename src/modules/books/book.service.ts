import { catchAsync } from "../../utils/catchAsync";
import { Request, Response } from "express";
import { IBook } from "./book.interface";
import Book from "./books.model";

const createBook = catchAsync(async (req: Request, res: Response) => {
    // const result = await Book.create(req);
    console.log(req)
    return 
})