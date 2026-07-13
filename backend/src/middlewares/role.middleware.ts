import type { RequestHandler } from "express";
import type { User } from "../types/user.types";
import type { AuthenticatedRequest } from "../types/request.types";

export const authorize = (...roles: User["role"][]) => {
    const middleware: RequestHandler = (req, res, next) => {
        const authenticatedReq = req as AuthenticatedRequest;

        if (!authenticatedReq.user) {
            res.status(401).json({ message: "Authentication required." });
            return;
        }

        if (!roles.includes(authenticatedReq.user.role)) {
            res.status(403).json({ message: "Access denied." });
            return;
        }

        next();
    };

    return middleware;
};