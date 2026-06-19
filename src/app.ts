import express, {  Application, NextFunction, Request, Response } from "express";
import routes from "./routes";
import mongoose from "mongoose";

const app: Application = express();

app.use(express.json());
app.use('/api', routes);

app.get("/", (req: Request, res: Response) => {
    res.send("app is running");
});

app.use(
  (
    error: unknown,
    req: Request,
    res: Response,
    _next: NextFunction
  ) => {


    if(error instanceof mongoose.Error.ValidationError){

      return res.status(400).json({

        success:false,
        message:"Validation failed",
        error:{
          name:error.name,
          errors:error.errors
        }

      });

    }


    const err = error as {
      statusCode?:number;
      message?:string;
    };


    res.status(err.statusCode || 500).json({

      success:false,
      message:err.message || "Something went wrong",
      error

    });


  }
);

export default app;