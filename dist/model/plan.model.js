"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Plan = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const planSchema = new mongoose_1.default.Schema({
    name: { type: String, required: false },
    duration: { type: Number, required: true },
    sessions: { type: Number, required: true },
    price: { type: Number, required: true },
    active: { type: Boolean, required: true, default: true },
    deleted: { type: Boolean, required: true, default: false },
}, { timestamps: true });
exports.Plan = mongoose_1.default.model("Plan", planSchema);
