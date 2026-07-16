import type { RequestHandler } from "express";
import type { User } from "../types/user.types";
import type { AuthenticatedRequest } from "../types/request.types";
import { HTTP_STATUS } from "../constants/http.constants";
import { AppError } from "../common/errors/app.error";
import { ERROR_CODES } from "../constants/error.codes.constants";

export const authorize = (...roles: User["role"][]) => {
    const middleware: RequestHandler = (req, res, next) => {
        const authenticatedReq = req as AuthenticatedRequest;

        if (!authenticatedReq.user) {
            return next(
                new AppError(
                    ERROR_CODES.UNAUTHORIZED,
                    "Authentication required.",
                    HTTP_STATUS.UNAUTHORIZED,
                )
            );
        }

        if (!roles.includes(authenticatedReq.user.role)) {
            return next(
                new AppError(
                    ERROR_CODES.FORBIDDEN,
                    "Access denied.",
                    HTTP_STATUS.FORBIDDEN,
                )
            );
        }

        next();
    };

    return middleware;
};