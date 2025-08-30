import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

interface AuthRequest extends Request {
  user?: any;
}

const authMiddleware = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");

  if (!token) {
    return res.status(401).send({ error: "Access denied. No token provided." });
  }

  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || "your_jwt_secret"
    );
    req.user = decoded;
    next();
  } catch (err) {
    res.status(400).send({ error: "Invalid token." });
  }
};

export default authMiddleware;
