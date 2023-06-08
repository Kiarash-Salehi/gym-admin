"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.mongoConn = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const config_1 = require("../config/config");
const mongoConn = async () => {
    return mongoose_1.default.connect(config_1.envConf.mongoUrl);
};
exports.mongoConn = mongoConn;
