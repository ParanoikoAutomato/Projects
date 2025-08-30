import { Request, Response, NextFunction } from "express";

import { UserRole } from "../enums/UserRole";
import { HTTPStatusCode } from "../enums/HTTPStatusCode";

interface AuthRequest extends Request {
  user?: any;
}

const adminMiddleware = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  if (req.user.role === UserRole.ADMIN) {
    next();
  } else {
    res.status(HTTPStatusCode.Forbidden).send({ error: "Invalid token." });
  }
};

export default adminMiddleware;
