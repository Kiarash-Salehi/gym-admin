import { RequestHandler } from "express";

export const coockiesHandler: RequestHandler = (req, res, next) => {
  const token = req?.cookies?.token;
  req.headers.authorization = `Bearer ${token}`;
  next();
};
