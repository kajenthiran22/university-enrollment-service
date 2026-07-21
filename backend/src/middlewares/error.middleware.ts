import type { Request, Response, NextFunction } from "express";
import { AppError } from "../common/errors/app.error";
import { ERROR_CODES } from "../constants/error.codes.constants";
import { HTTP_STATUS } from "../constants/http.constants";
import { logger, env } from "../config";
import { ZodError } from "zod";
import { NODE_ENVS } from "../constants/env.constants";

const isDevelopment = env.NODE_ENV === NODE_ENVS.DEVELOPMENT;

export const errorMiddleware = (error: Error, req: Request, res: Response, next: NextFunction): void => {
    if (error instanceof ZodError) {
        logger.warn({
            path: req.originalUrl,
            method: req.method,
            issues: error.issues,
        });

        res.status(HTTP_STATUS.UNPROCESSABLE_ENTITY)
            .json({
                success: false,
                error: {
                    code: ERROR_CODES.VALIDATION_ERROR,
                    message: "Invalid request data.",
                    status: HTTP_STATUS.UNPROCESSABLE_ENTITY,
                    details: error.issues.map((issue) => ({
                        field: issue.path.join("."),
                        message: issue.message,
                    })),
                },
            });
        return;
    }

    if (error instanceof AppError) {
        logger.warn({
            code: error.code,
            message: error.message,
            status: error.httpStatus,
            path: req.originalUrl,
        });

        res.status(error.httpStatus).json({
            success: false,
            error: {
                code: error.code,
                message: error.message,
                status: error.httpStatus,
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
                status: HTTP_STATUS.INTERNAL_SERVER_ERROR,
            },
            ...(isDevelopment && {
                message: error.message,
                stack: error.stack,
            }),
            path: req.originalUrl,
        });
};