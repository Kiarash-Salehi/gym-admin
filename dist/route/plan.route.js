"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.planRouter = void 0;
const express_1 = require("express");
const plan_model_1 = require("../model/plan.model");
exports.planRouter = (0, express_1.Router)();
exports.planRouter.get("/list", async (req, res, next) => {
    try {
        const plans = await plan_model_1.Plan.find({ deleted: false }).lean();
        res.render("plan/list", { plans });
    }
    catch (error) {
        next(error);
    }
});
exports.planRouter.get("/create", async (req, res, next) => {
    try {
        res.render("plan/create");
    }
    catch (error) {
        next(error);
    }
});
exports.planRouter.post("/create", async (req, res, next) => {
    try {
        await plan_model_1.Plan.create(req.body);
        res.redirect("list");
    }
    catch (error) {
        next(error);
    }
});
exports.planRouter.post("/delete/:planId", async (req, res, next) => {
    try {
        await plan_model_1.Plan.updateOne({ _id: req.params.planId }, { deleted: true });
        res.redirect("/plan/list");
    }
    catch (error) {
        next(error);
    }
});
