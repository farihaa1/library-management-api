import app from "../app";
import { NextFunction, Request, Response } from "express"

app.use(
    (
        error: any,
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        res.status(error.statusCode || 500).json({
            success: false,
            message: error.message || "Something went wrong",
            error,
        });
    }
);