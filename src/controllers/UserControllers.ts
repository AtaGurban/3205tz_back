import { Request, Response, NextFunction } from "express";
import ApiError from "../error/ApiError";
import NodeCache from 'node-cache';

const myCache = new NodeCache();
const data: responseData[] = require("../data/data.json");
interface responseData {
  email: string;
  number: string;
}
class UserController {
  async submit(req: Request, res: Response, next: NextFunction) {
    try {
      const { email }: {email: string} = req.query as { email: string };
      const num: string | undefined = req.query?.number as string | undefined;

      if (!email) {
        return next(ApiError.badRequest("Не полные данные"));
      }
      await new Promise((resolve) => setTimeout(resolve, 5000));
      const cache = myCache.get<string | null>('newReq');
      
      if (cache){
        return next()
      }
      const result: responseData[] | undefined = data.filter(
        (i) => i.email === email && (num ? i.number === num : true)
      );
      if (result.length > 0){
        return res.json({result: true, data: result, message: ""});
      } else {
        return res.json({result: false, data: null, message: "Ничего не найдено"});
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        return next(ApiError.internal(error.message));
      } else {
        // Обработка других типов ошибок или дополнительная логика
        return next(ApiError.internal("Неизвестная ошибка"));
      }
    }
  }
  async checkNewReq(req: Request, res: Response, next: NextFunction) {
    try {
      myCache.set("newReq", true, 5);
      return res.status(200).json()
    } catch (error: unknown) {
      if (error instanceof Error) {
        return next(ApiError.internal(error.message));
      } else {
        // Обработка других типов ошибок или дополнительная логика
        return next(ApiError.internal("Неизвестная ошибка"));
      }
    }
  }
}

export default new UserController();
