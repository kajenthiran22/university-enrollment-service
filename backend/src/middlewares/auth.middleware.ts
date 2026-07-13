import type { RequestHandler } from "express";
import { verifyToken } from "../utils/jwt.util";
import type { AuthenticatedRequest } from "../types/request.types";

export const authenticate: RequestHandler = (req, res, next) => {
    const authenticatedReq = req as AuthenticatedRequest;
    const authorizationHeader = authenticatedReq.header("Authorization");

    if (!authorizationHeader?.startsWith("Bearer ")) {
        res.status(401).json({ message: "Authentication required." });
        return;
    }

    const token = authorizationHeader.substring(7);

    try {
        authenticatedReq.user = verifyToken(token);
        next();
    }
    catch {
        res.status(401).json({ message: "Invalid or expired token." });
    }
};