import { Router } from "express";
import bookRoutes from "../modules/books/book.route";

const routes = Router();

routes.use("/books", bookRoutes);

export default routes;

