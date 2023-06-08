import { ICommon, TMongoId } from "./common.interface";
import { IPlan } from "./plan.interface";

export interface IMember extends ICommon {
  firstName: string;
  lastName: string;
  age: number;
  gender: string;
  phoneNumber: string;
  email?: string;
  address?: string;
  joiningDate: Date;
  plans: IMemberPlan[];
}

export interface IMemberPlan extends IPlan {
  end: Date;
  start: Date;
  remainingSessions: number;
  plan: TMongoId | IPlan;
}

export interface IMemberActivityLog extends ICommon {
  member: TMongoId;
  memberPlan: TMongoId;
}
