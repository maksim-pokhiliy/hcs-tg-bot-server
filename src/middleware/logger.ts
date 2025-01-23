import type { Request, Response, NextFunction } from "express";

export const requestLogger = (req: Request, res: Response, next: NextFunction) => {
  console.info(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
};
