import type { Request } from "express";
import type { JwtPayload } from "./auth.types";

export interface AuthenticatedRequest<P = {}> extends Request<P> {
    user: JwtPayload;
}