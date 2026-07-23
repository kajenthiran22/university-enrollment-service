import type { NextFunction, Request, Response } from "express";
import { HTTP_STATUS } from "../constants/http.constants";
import { APP } from "../constants/app.constants";
import { ApiResponse } from "../common/responses/api.response";
import * as healthService from "../services/health.service";

export const healthCheck = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const health = await healthService.getHealthStatus();

        res.status(
            health.status === APP.UP
                ? HTTP_STATUS.OK
                : HTTP_STATUS.SERVICE_UNAVAILABLE,
        ).json(
            new ApiResponse(
                health.status === APP.UP
                    ? HTTP_STATUS.OK
                    : HTTP_STATUS.SERVICE_UNAVAILABLE,
                "Health check completed successfully.",
                health,
            ),
        );
    }
    catch (error) {
        next(error);
    }
};