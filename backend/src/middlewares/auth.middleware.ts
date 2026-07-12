import type { Request, Response, NextFunction } from "express";
import { verifyToken } from "../utils/jwt.util";
import type { AuthenticatedRequest } from "../types/request.types";

export const authenticate = (
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction,
): void => {
    const authorizationHeader = req.header("Authorization");

    if (!authorizationHeader?.startsWith("Bearer ")) {
        res.status(401).json({ message: "Authentication required." });
        return;
    }

    const token = authorizationHeader.substring(7);

    try {
        req.user = verifyToken(token);
        next();
    }
    catch (error) {
        res.status(401).json({ message: "Invalid or expired token." });
    }
};