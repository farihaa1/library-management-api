import { Router } from "express";
import { bookController } from "./books.controller";

const bookRoutes = Router();

bookRoutes.post('/', bookController.createBookIntoDb)
bookRoutes.get('/', bookController.getBooksFromDb)
bookRoutes.get("/:bookId", bookController.getBookByIdFromDB);
bookRoutes.put("/:bookId", bookController.updateBookFromDB);
bookRoutes.delete("/:bookId", bookController.deleteBookFromDB);

export default bookRoutes
