"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const logger_1 = require("../log/logger");
const errorHandler = (err, req, res, _next) => {
    const status = res.statusCode ? res.statusCode : 500;
    logger_1.logger.error(err);
    res.status(status).json({ message: err.message });
};
exports.errorHandler = errorHandler;
