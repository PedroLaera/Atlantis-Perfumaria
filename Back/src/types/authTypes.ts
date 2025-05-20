import { Request } from "express";

export interface AuthRequest extends Request {
  user?: { id_user: number; email?: string };
}

