import { NextFunction, Request, Response, Router } from "express";
import jwt from "jsonwebtoken";
import { envConf } from "../internal/config/config";
export const authRouter = Router();

authRouter.get(
  "/login",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      res.render("auth/login");
    } catch (error) {
      next(error);
    }
  }
);

authRouter.post("/login", (req: Request, res: Response, next: NextFunction) => {
  const token = jwt.sign({ loggedIn: true }, envConf.jwtSecret, {
    expiresIn: envConf.jwtExpire,
  });
  if (
    req.body.phoneNumber == "09902018678" &&
    req.body.password == "Zahra678"
  ) {
    res.cookie("token", token, { httpOnly: true });
    res.redirect("/");
  } else {
    res.statusCode = 401;
    next({ message: "wrong credentials" });
  }
});

authRouter.get("/logout", (req: Request, res: Response, next: NextFunction) => {
  res.cookie("token", "");
  res.redirect("/");
});
