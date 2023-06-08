import { NextFunction, Request, RequestHandler, Response } from "express";
import { logger } from "../log/logger";

export const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  _next: NextFunction
) => {
  const status = res.statusCode ? res.statusCode : 500;
  logger.error(err);
  res.status(status).json({ message: err.message });
};
