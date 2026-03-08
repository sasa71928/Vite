import { Request, Response, NextFunction } from "express";

export function tokenGuard(req: Request, res: Response, next: NextFunction): void {
  if (req.method === "GET") {
    next();
    return;
  }

  const token = req.header("token");

  if (token !== "Oscar70") {
    res.status(403).json({ error: "Forbidden: invalid token" });
    return;
  }

  next();
}
