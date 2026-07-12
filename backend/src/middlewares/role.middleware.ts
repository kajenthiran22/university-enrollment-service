import type { Request, Response, NextFunction } from "express";
import type { User } from "../types/user.types";
import type { AuthenticatedRequest } from "../types/request.types";

export const authorize = (...roles: User["role"][]) => {
    return (
        req: AuthenticatedRequest,
        res: Response,
        next: NextFunction,
    ): void => {
        if (!req.user) {
            res.status(401).json({ message: "Authentication required." });
            return;
        }

        if (!roles.includes(req.user.role)) {
            res.status(403).json({ message: "Access denied." });
            return;
        }

        next();
    };
};