import { NextFunction, Request, Response, Router } from "express";
import { Member } from "../model/member.model";
import { Plan } from "../model/plan.model";
import { IMember, IMemberPlan } from "../interface/member.interface";
import { MemberActivityLog } from "../model/activity-log.model";

export const memberRouter = Router();

memberRouter.get(
  "/list",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const filter = (req.query?.filter as string) || "";
      const mongoFilter = filter.replace(/ /gi, "|");
      const members = await Member.find({
        $or: [
          { phoneNumber: { $regex: mongoFilter } },
          { firstName: { $regex: mongoFilter, $options: "i" } },
          { lastName: { $regex: mongoFilter, $options: "i" } },
        ],
      }).lean();
      res.render("member/list", { members, filter });
    } catch (error) {
      next(error);
    }
  }
);

memberRouter.get(
  "/one/:id",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const member = await Member.findOne({ _id: req.params.id })
        .populate({ path: "plans.plan", select: "_id name sessions" })
        .lean();
      member?.plans?.sort((a, b) => (a.start < b.start ? 1 : -1));
      const memberActivityLogs = await MemberActivityLog.find({
        member: member?._id,
      }).sort({ createdAt: -1 });
      res.render("member/one", { member, memberActivityLogs });
    } catch (error) {
      next(error);
    }
  }
);

memberRouter.get(
  "/create",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      res.render("member/create");
    } catch (error) {
      next(error);
    }
  }
);

memberRouter.post(
  "/create",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const newMember = await Member.create(req.body);
      res.redirect(`/member/one/${newMember._id.toString()}`);
    } catch (error) {
      next(error);
    }
  }
);

memberRouter.get(
  "/add-plan/:id",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const plans = await Plan.find({ active: true, deleted: false }).lean();
      res.render("member/add-plan", { plans, member: { _id: req.params.id } });
    } catch (error) {
      next(error);
    }
  }
);

memberRouter.post(
  "/add-plan/:id",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const member = await Member.findOne({ _id: req.params.id });
      member?.plans.push(req.body);
      await member?.save();
      res.redirect(`/member/one/${member?._id.toString()}`);
    } catch (error) {
      next(error);
    }
  }
);

memberRouter.post(
  "/log-entry/:memberId",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const now = new Date();
      const member = await Member.findOne({ _id: req.params.memberId });
      if (!member) throw new Error("member not found");
      const plan = member.plans.find(
        (plan) => plan._id.toString() == req.body.planId
      );
      if (
        !plan ||
        plan?.start > now ||
        plan?.end < now ||
        plan?.remainingSessions <= 0
      )
        throw new Error("plan is not active at the moment");
      plan.remainingSessions -= 1;
      await MemberActivityLog.create({
        member: member._id,
        memberPlan: plan._id,
      });
      await member?.save();
      res.redirect(`/member/one/${member?._id.toString()}`);
    } catch (error) {
      next(error);
    }
  }
);

const getMemberCurrentPlan = (member: IMember): IMemberPlan | undefined => {
  return member.plans.find((plan) => {
    const now = new Date();
    return plan.start <= now && plan.end >= now;
  });
};
