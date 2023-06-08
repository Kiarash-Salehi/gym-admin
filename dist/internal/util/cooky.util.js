"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.coockiesHandler = void 0;
const coockiesHandler = (req, res, next) => {
    const token = req?.cookies?.token;
    req.headers.authorization = `Bearer ${token}`;
    next();
};
exports.coockiesHandler = coockiesHandler;
