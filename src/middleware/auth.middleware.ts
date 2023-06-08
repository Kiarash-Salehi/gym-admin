import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { envConf } from "../internal/config/config";

export const authenticateJWT = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.redirect("/auth/login");
  }
  try {
    const decoded = jwt.verify(token, envConf.jwtSecret);
    (req as any).user = decoded;
    next();
  } catch (error: any) {
    res.statusCode = 403;
    error.message = "Invalid token";
    res.redirect("/auth/login");
    return next(error);
  }
};
