import mongoose from "mongoose";
import { envConf } from "../config/config";

export const mongoConn = async () => {
  return mongoose.connect(envConf.mongoUrl);
};
