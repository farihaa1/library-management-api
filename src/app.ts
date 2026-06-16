import express, { Application, Request, Response } from "express";
import routes from "./routes";

const app: Application = express();

app.use(express.json());
app.use('/api', routes);

app.get("/", (req: Request, res: Response) => {
    res.send("app is running");
});

// Global Error Handler
app.use((
    error: unknown,
    req: Request,
    res: Response,
) => {

    const err = error as {
        statusCode?: number;
        message?: string;
    };

    const statusCode = err.statusCode || 500;
    const message = err.message || "Something went wrong";

    res.status(statusCode).json({
        success: false,
        message,
        error,
    });
});
export default app;