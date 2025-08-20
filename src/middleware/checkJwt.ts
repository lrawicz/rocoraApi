import { Request, Response, NextFunction } from "express";
import * as jwt from "jsonwebtoken";
import config from "../config/config";

interface AuthRequest extends Request {
  userId?: number;
  role?: string;
}

export const checkJwt = (req: AuthRequest, res: Response, next: NextFunction) => {
  const token = <string>req.headers.authorization?.split(" ")[1];
  let jwtPayload;

  try {
    jwtPayload = <any>jwt.verify(token, config.JWT_SECRET);
    req.userId = jwtPayload.userId;
    req.role = jwtPayload.role;
  } catch (error) {
    return res.status(401).send("Unauthorized");
  }

  const { userId, username, role } = jwtPayload;
  const newToken = jwt.sign({ userId, username, role }, config.JWT_SECRET, { expiresIn: "1h" });
  res.setHeader("token", newToken);

  next();
};
