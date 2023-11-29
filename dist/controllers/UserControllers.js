"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ApiError_1 = __importDefault(require("../error/ApiError"));
const node_cache_1 = __importDefault(require("node-cache"));
const myCache = new node_cache_1.default();
const data = require("../data/data.json");
class UserController {
    submit(req, res, next) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { email } = req.query;
                const num = (_a = req.query) === null || _a === void 0 ? void 0 : _a.number;
                if (!email) {
                    return next(ApiError_1.default.badRequest("Не полные данные"));
                }
                yield new Promise((resolve) => setTimeout(resolve, 5000));
                const cache = myCache.get('newReq');
                if (cache) {
                    return next();
                }
                const result = data.filter((i) => i.email === email && (num ? i.number === num : true));
                if (result.length > 0) {
                    return res.json({ result: true, data: result, message: "" });
                }
                else {
                    return res.json({ result: false, data: null, message: "Ничего не найдено" });
                }
            }
            catch (error) {
                if (error instanceof Error) {
                    return next(ApiError_1.default.internal(error.message));
                }
                else {
                    // Обработка других типов ошибок или дополнительная логика
                    return next(ApiError_1.default.internal("Неизвестная ошибка"));
                }
            }
        });
    }
    checkNewReq(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                myCache.set("newReq", true, 5);
                return res.status(200).json();
            }
            catch (error) {
                if (error instanceof Error) {
                    return next(ApiError_1.default.internal(error.message));
                }
                else {
                    // Обработка других типов ошибок или дополнительная логика
                    return next(ApiError_1.default.internal("Неизвестная ошибка"));
                }
            }
        });
    }
}
exports.default = new UserController();
