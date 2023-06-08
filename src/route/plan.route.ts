import { NextFunction, Request, Response, Router } from "express";
import { Plan } from "../model/plan.model";
export const planRouter = Router();

planRouter.get(
  "/list",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const plans = await Plan.find({ deleted: false }).lean();
      res.render("plan/list", { plans });
    } catch (error) {
      next(error);
    }
  }
);

planRouter.get(
  "/create",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      res.render("plan/create");
    } catch (error) {
      next(error);
    }
  }
);

planRouter.post(
  "/create",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await Plan.create(req.body);
      res.redirect("list");
    } catch (error) {
      next(error);
    }
  }
);

planRouter.post(
  "/delete/:planId",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await Plan.updateOne({ _id: req.params.planId }, { deleted: true });
      res.redirect("/plan/list");
    } catch (error) {
      next(error);
    }
  }
);
