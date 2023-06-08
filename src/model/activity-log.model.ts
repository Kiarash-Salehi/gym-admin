import mongoose from "mongoose";
import { IMemberActivityLog } from "../interface/member.interface";

const memberActivityLogSchema = new mongoose.Schema<IMemberActivityLog>(
  {
    member: { type: mongoose.Schema.Types.ObjectId, ref: "Member" },
    memberPlan: { type: String },
    active: { type: Boolean, required: true, default: true },
    deleted: { type: Boolean, required: true, default: false },
  },
  { timestamps: true }
);

export const MemberActivityLog = mongoose.model(
  "MemberActivityLog",
  memberActivityLogSchema
);
