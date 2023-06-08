"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MemberActivityLog = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const memberActivityLogSchema = new mongoose_1.default.Schema({
    member: { type: mongoose_1.default.Schema.Types.ObjectId, ref: "Member" },
    memberPlan: { type: String },
    active: { type: Boolean, required: true, default: true },
    deleted: { type: Boolean, required: true, default: false },
}, { timestamps: true });
exports.MemberActivityLog = mongoose_1.default.model("MemberActivityLog", memberActivityLogSchema);
