import "reflect-metadata";
import * as dotenv from "dotenv";
import express, { NextFunction, Response, Request } from "express";
import "express-async-errors";
import swaggerUi from "swagger-ui-express";
import "../../container";

import { AppError } from "@shared/errors/AppError";
import { createConnection } from "@shared/infra/typeorm/index";

import swaggerFile from "../../../swagger.json";
import { router } from "./routes";

if (process.env.NODE_ENV !== "production") {
  dotenv.config();
}

createConnection()
  .then(() => console.log("Database initialized!"))
  .catch((err) => console.log("Database error", err));

const app = express();
app.use(express.json());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.use(router);

app.use(
  (err: Error, request: Request, response: Response, next: NextFunction) => {
    if (err instanceof AppError) {
      return response.status(err.statusCode).json({
        message: err.message,
      });
    }

    return response.status(500).json({
      status: "error",
      message: `Internal server error - ${err.message}`,
    });
  }
);

export { app };
