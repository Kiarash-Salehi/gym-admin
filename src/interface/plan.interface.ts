import { ICommon } from "./common.interface";

export interface IPlan extends ICommon {
  name?: string;
  price: number;
  duration: number;
  sessions: number;
}
