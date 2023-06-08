"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.envConf = void 0;
exports.envConf = {
    port: process.env.PORT,
    mongoUrl: process.env.MONGO_URL,
    jwtSecret: process.env.JWT_SECRET,
    jwtExpire: process.env.JWT_EXPIRE,
};
