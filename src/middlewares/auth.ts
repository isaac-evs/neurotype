/* Import neccesary modules and dependencies */
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import User, { IUser } from "../models/userModel";

/* Extender Request to include optional user property for authentication  */
export interface AuthRequest extends Request {
  user?: IUser;
}

/* Auth: Extracts jwt, decodes it and search it in the database*/
export const auth = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const token = req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      throw new Error("No token provided");
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as {
      _id: string;
    };
    const user = await User.findOne({ _id: decoded._id });

    if (!user) {
      throw new Error("User not found");
    }

    req.user = user;
    next();
  } catch (error) {
    res.status(401).send({ error: "Please authenticate." });
  }
};

/* Authorize: Extract role and validates it*/
export const authorize = (roles: string[]) => {
  return (req: AuthRequest, res: Response, next: NextFunction): void => {
    if (!req.user) {
      res.status(401).send({ error: "Please authenticate." });
      return;
    }

    if (!roles.includes(req.user.role)) {
      res
        .status(403)
        .send({ error: "Access denied. Insufficient permissions." });
      return;
    }

    next();
  };
};
