import { Router } from "express";
import bookRoutes from "../modules/books/book.route";
import borrowRoutes from "../modules/borrow/borrow.route";

const routes = Router();

routes.use("/books", bookRoutes);
routes.use("/borrow_book", borrowRoutes);

export default routes;

