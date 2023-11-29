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
const NodeCache = require("node-cache");
const { workerData, parentPort } = require("worker_threads");
const myCache = new NodeCache();
const data = require("../data/data.json");
const submitFunc = () => __awaiter(void 0, void 0, void 0, function* () {
    // const { email, number } = workerData;
    const currentTime = new Date();
    myCache.set("lastRequestTime", currentTime, 10);
    console.log("currentTime", +currentTime);
    yield new Promise((resolve) => setTimeout(resolve, 5000)); 
    const lastRequestTime = myCache.get("lastRequestTime");
    console.log("lastRequestTime", +new Date(lastRequestTime !== null && lastRequestTime !== void 0 ? lastRequestTime : ""));
    // if (lastRequestTime) {
    //     const currentTime = Date.now();
    //     if (+lastRequestTime < currentTime) {
    //         const result = data.find((i) => i.email === email && (number ? i.number === number : true));
    //         if (result) {
    //             // Assuming res is available in your worker context
    //             parentPort === null || parentPort === void 0 ? void 0 : parentPort.postMessage({ result, message: "" });
    //         }
    //         else {
    //             // Assuming res is available in your worker context
    //             parentPort === null || parentPort === void 0 ? void 0 : parentPort.postMessage({ result: null, message: "Ничего не найдено" });
    //         }
    //     }
    //     else {
    //         return;
    //     }
    // }
    // else {
    //     const result = data.find((i) => i.email === email && (number ? i.number === number : true));
    //     if (result) {
    //         // Assuming res is available in your worker context
    //         parentPort === null || parentPort === void 0 ? void 0 : parentPort.postMessage({ result, message: "" });
    //     }
    //     else {
    //         // Assuming res is available in your worker context
    //         parentPort === null || parentPort === void 0 ? void 0 : parentPort.postMessage({ result: null, message: "Ничего не найдено" });
    //     }
    // }
});
submitFunc();
