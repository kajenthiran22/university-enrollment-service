import type { Request, Response, NextFunction } from "express";
import { AppError } from "../common/errors/app.error";
import { ERROR_CODES } from "../constants/error.codes.constants";
import { HTTP_STATUS } from "../constants/http.constants";
import { logger } from "../config";


export const errorMiddleware = (error: Error, req: Request, res: Response, next: NextFunction): void => {
    if (error instanceof AppError) {
        logger.warn({
            code: error.code,
            message: error.message,
            path: req.originalUrl,
        });

        res.status(error.statusCode).json({
            success: false,
            error: {
                code: error.code,
                message: error.message,
            },
        });
        return;
    }

    logger.error({
        message: error.message,
        stack: error.stack,
        path: req.originalUrl,
    });

    res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR)
        .json({
            success: false,
            error: {
                code: ERROR_CODES.INTERNAL_ERROR,
                message: "Internal server error.",
            },
        });
};