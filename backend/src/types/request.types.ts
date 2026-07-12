import type { Request } from "express";
import type { JwtPayload } from "./auth.types";

export interface AuthenticatedRequest extends Request {
    user: JwtPayload;
}