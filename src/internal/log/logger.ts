import { NextFunction, Request, RequestHandler, Response } from "express";
import winston from "winston";

export const logger = winston.createLogger({
  level: "info",
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.printf(
      (info) => `${info.timestamp} ${info.level}: ${info.message}`
    )
  ),
  transports: [new winston.transports.Console()],
});

export const requestLogHandler: RequestHandler = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  logger.info(`Received a ${req.method} request for ${req.url}`);
  next();
};
