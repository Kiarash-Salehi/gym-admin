"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.memberRouter = void 0;
const express_1 = require("express");
const member_model_1 = require("../model/member.model");
const plan_model_1 = require("../model/plan.model");
const activity_log_model_1 = require("../model/activity-log.model");
exports.memberRouter = (0, express_1.Router)();
exports.memberRouter.get("/list", async (req, res, next) => {
    try {
        const filter = req.query?.filter || "";
        const mongoFilter = filter.replace(/ /gi, "|");
        const members = await member_model_1.Member.find({
            $or: [
                { phoneNumber: { $regex: mongoFilter } },
                { firstName: { $regex: mongoFilter, $options: "i" } },
                { lastName: { $regex: mongoFilter, $options: "i" } },
            ],
        }).lean();
        res.render("member/list", { members, filter });
    }
    catch (error) {
        next(error);
    }
});
exports.memberRouter.get("/one/:id", async (req, res, next) => {
    try {
        const member = await member_model_1.Member.findOne({ _id: req.params.id })
            .populate({ path: "plans.plan", select: "_id name sessions" })
            .lean();
        member?.plans?.sort((a, b) => (a.start < b.start ? 1 : -1));
        const memberActivityLogs = await activity_log_model_1.MemberActivityLog.find({
            member: member?._id,
        }).sort({ createdAt: -1 });
        res.render("member/one", { member, memberActivityLogs });
    }
    catch (error) {
        next(error);
    }
});
exports.memberRouter.get("/create", async (req, res, next) => {
    try {
        res.render("member/create");
    }
    catch (error) {
        next(error);
    }
});
exports.memberRouter.post("/create", async (req, res, next) => {
    try {
        const newMember = await member_model_1.Member.create(req.body);
        res.redirect(`/member/one/${newMember._id.toString()}`);
    }
    catch (error) {
        next(error);
    }
});
exports.memberRouter.get("/add-plan/:id", async (req, res, next) => {
    try {
        const plans = await plan_model_1.Plan.find({ active: true, deleted: false }).lean();
        res.render("member/add-plan", { plans, member: { _id: req.params.id } });
    }
    catch (error) {
        next(error);
    }
});
exports.memberRouter.post("/add-plan/:id", async (req, res, next) => {
    try {
        const member = await member_model_1.Member.findOne({ _id: req.params.id });
        member?.plans.push(req.body);
        await member?.save();
        res.redirect(`/member/one/${member?._id.toString()}`);
    }
    catch (error) {
        next(error);
    }
});
exports.memberRouter.post("/log-entry/:memberId", async (req, res, next) => {
    try {
        const now = new Date();
        const member = await member_model_1.Member.findOne({ _id: req.params.memberId });
        if (!member)
            throw new Error("member not found");
        const plan = member.plans.find((plan) => plan._id.toString() == req.body.planId);
        if (!plan ||
            plan?.start > now ||
            plan?.end < now ||
            plan?.remainingSessions <= 0)
            throw new Error("plan is not active at the moment");
        plan.remainingSessions -= 1;
        await activity_log_model_1.MemberActivityLog.create({
            member: member._id,
            memberPlan: plan._id,
        });
        await member?.save();
        res.redirect(`/member/one/${member?._id.toString()}`);
    }
    catch (error) {
        next(error);
    }
});
const getMemberCurrentPlan = (member) => {
    return member.plans.find((plan) => {
        const now = new Date();
        return plan.start <= now && plan.end >= now;
    });
};
