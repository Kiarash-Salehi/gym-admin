"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticateJWT = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("../internal/config/config");
const authenticateJWT = (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
        return res.redirect("/auth/login");
    }
    try {
        const decoded = jsonwebtoken_1.default.verify(token, config_1.envConf.jwtSecret);
        req.user = decoded;
        next();
    }
    catch (error) {
        res.statusCode = 403;
        error.message = "Invalid token";
        res.redirect("/auth/login");
        return next(error);
    }
};
exports.authenticateJWT = authenticateJWT;
