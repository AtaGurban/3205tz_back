import * as dotenv from "dotenv";
dotenv.config();

import express, { Express, Request, Response, NextFunction } from "express";
import cors from "cors";
import router from "./routes/index";
import ErrorHandlingMiddleware from "./middleware/ErrorHandlingMiddleware";

const app: Express = express();
const port: number = parseInt(process.env.PORT || "8080", 10);

app.use(cors());
app.use(express.json());
// Middleware для обработки данных формы
app.use(express.urlencoded({ extended: true }));

app.use("/api", router);

// Обработчик ошибок
app.use(ErrorHandlingMiddleware);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
