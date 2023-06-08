"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRouter = void 0;
const express_1 = require("express");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("../internal/config/config");
exports.authRouter = (0, express_1.Router)();
exports.authRouter.get("/login", async (req, res, next) => {
    try {
        res.render("auth/login");
    }
    catch (error) {
        next(error);
    }
});
exports.authRouter.post("/login", (req, res, next) => {
    const token = jsonwebtoken_1.default.sign({ loggedIn: true }, config_1.envConf.jwtSecret, {
        expiresIn: config_1.envConf.jwtExpire,
    });
    if (req.body.phoneNumber == "09902018678" &&
        req.body.password == "Zahra678") {
        res.cookie("token", token, { httpOnly: true });
        res.redirect("/");
    }
    else {
        res.statusCode = 401;
        next({ message: "wrong credentials" });
    }
});
exports.authRouter.get("/logout", (req, res, next) => {
    res.cookie("token", "");
    res.redirect("/");
});
