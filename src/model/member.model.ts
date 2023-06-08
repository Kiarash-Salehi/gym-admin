import mongoose from "mongoose";
import { IMember } from "../interface/member.interface";

const memberSchema = new mongoose.Schema<IMember>(
  {
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
        plan: { type: mongoose.Schema.Types.ObjectId, ref: "Plan" },
      },
    ],
  },
  { timestamps: true }
);

export const Member = mongoose.model("Member", memberSchema);
