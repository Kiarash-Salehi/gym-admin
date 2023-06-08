import mongoose from "mongoose";
import { IPlan } from "../interface/plan.interface";

const planSchema = new mongoose.Schema<IPlan>(
  {
    name: { type: String, required: false },
    duration: { type: Number, required: true },
    sessions: { type: Number, required: true },
    price: { type: Number, required: true },
    active: { type: Boolean, required: true, default: true },
    deleted: { type: Boolean, required: true, default: false },
  },
  { timestamps: true }
);

export const Plan = mongoose.model("Plan", planSchema);
