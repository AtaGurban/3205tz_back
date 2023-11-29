"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.submitWorker = void 0;
const path = require("path");
const worker_threads_1 = require("worker_threads");
function submitWorker(data) {
    return new Promise((resolve, reject) => {
        const worker = new worker_threads_1.Worker(path.resolve(__dirname, "./submitFunc.js"));
        worker.postMessage({ data });
        // worker.on("message", resolve);
        // worker.on("error", reject);
        // worker.on("exit", (code) => {
        //   if (code !== 0)
        //     reject(new Error(`Worker stopped with exit code ${code}`));
        // });
    });
}
exports.submitWorker = submitWorker;
