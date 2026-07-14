import type { Request, Response, NextFunction } from "express";
import { AppError } from "../common/errors/app.error";
import { ERROR_CODES } from "../constants/error.codes.constants";
import { HTTP_STATUS } from "../constants/http.constants";

export const notFoundMiddleware = (req: Request, res: Response, next: NextFunction): void => {
    const error = new AppError(
        ERROR_CODES.RESOURCE_NOT_FOUND,
        `Route ${req.originalUrl} not found.`,
        HTTP_STATUS.NOT_FOUND,
    );
    
    next(error);
};