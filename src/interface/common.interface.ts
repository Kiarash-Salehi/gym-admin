import mongoose from "mongoose";

export type TMongoId = string | mongoose.Types.ObjectId;

export interface ICommon {
  _id: TMongoId;
  active: boolean;
  deleted: boolean;
  createdAt: Date;
  updatedAt: Date;
}
