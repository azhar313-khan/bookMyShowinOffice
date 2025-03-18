import { Request } from "express";
import { JwtPayload } from "jsonwebtoken";

export interface AuthenticatedUser extends JwtPayload {
  id: string;
  role: string;
}

export interface AuthenticatedRequest extends Request {
  user?: AuthenticatedUser;
}
