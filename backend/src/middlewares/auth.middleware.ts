import type { RequestHandler } from "express";
import { verifyToken } from "../utils/jwt.util";
import type { AuthenticatedRequest } from "../types/request.types";
import { HTTP_STATUS } from "../constants/http.constants";
import { AppError } from "../common/errors/app.error";
import { ERROR_CODES } from "../constants/error.codes.constants";

export const authenticate: RequestHandler = (req, res, next) => {
    const authenticatedReq = req as AuthenticatedRequest;
    const authorizationHeader = authenticatedReq.header("Authorization");

    if (!authorizationHeader?.startsWith("Bearer ")) {
        return next(
            new AppError(
                ERROR_CODES.UNAUTHORIZED,
                "Authentication required.",
                HTTP_STATUS.UNAUTHORIZED,
            )
        );
    }

    const token = authorizationHeader.substring(7);

    try {
        authenticatedReq.user = verifyToken(token);
        next();
    }
    catch {
        return next(
            new AppError(
                ERROR_CODES.UNAUTHORIZED,
                "Invalid or expired token.",
                HTTP_STATUS.UNAUTHORIZED,
            )
        );
    }
};