"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Member = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const memberSchema = new mongoose_1.default.Schema({
    firstName: String,
    lastName: String,
    phoneNumber: { type: String, min: 11, max: 11, unique: true },
    active: { type: Boolean, required: true, default: true },
    deleted: { type: Boolean, required: true, default: false },
    address: String,
    age: Number,
    email: String,
    joiningDate: { type: Date, default: () => new Date() },
    gender: String,
    plans: [
        {
            start: { type: Date, required: true, default: () => new Date() },
            end: { type: Date, required: true, default: () => new Date() },
            remainingSessions: Number,
            plan: { type: mongoose_1.default.Schema.Types.ObjectId, ref: "Plan" },
        },
    ],
}, { timestamps: true });
exports.Member = mongoose_1.default.model("Member", memberSchema);
