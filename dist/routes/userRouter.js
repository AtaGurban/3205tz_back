"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const UserControllers_1 = __importDefault(require("../controllers/UserControllers"));
const router = (0, express_1.Router)();
router.get('/submit', UserControllers_1.default.submit);
router.put('/checkNewReq', UserControllers_1.default.checkNewReq);
exports.default = router;
