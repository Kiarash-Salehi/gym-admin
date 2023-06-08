"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.requestLogHandler = exports.logger = void 0;
const winston_1 = __importDefault(require("winston"));
exports.logger = winston_1.default.createLogger({
    level: "info",
    format: winston_1.default.format.combine(winston_1.default.format.timestamp(), winston_1.default.format.printf((info) => `${info.timestamp} ${info.level}: ${info.message}`)),
    transports: [new winston_1.default.transports.Console()],
});
const requestLogHandler = (req, res, next) => {
    exports.logger.info(`Received a ${req.method} request for ${req.url}`);
    next();
};
exports.requestLogHandler = requestLogHandler;
