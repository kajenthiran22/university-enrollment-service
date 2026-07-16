import type { Request, Response, NextFunction } from "express";
import * as adminService from "../services/admin.service";
import { HTTP_STATUS } from "../constants/http.constants";
import { ApiResponse } from "../common/responses/api.response";

export const getPendingUsers = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const users = await adminService.getPendingUsers();

        res.status(HTTP_STATUS.OK).json(
            new ApiResponse(
                HTTP_STATUS.OK,
                "Pending users retrieved successfully.",
                users,
            ),
        );
    }
    catch (error) {
        next(error);
    }
};

export const approveUser = async (req: Request<{ id: string }>, res: Response, next: NextFunction): Promise<void> => {
    try {
        await adminService.approveUser(req.params.id);

        res.status(HTTP_STATUS.OK).json(
            new ApiResponse(
                HTTP_STATUS.OK,
                "User approved successfully.",
            ),
        );
    }
    catch (error) {
        next(error);
    }
};

export const rejectUser = async (req: Request<{ id: string }>, res: Response, next: NextFunction): Promise<void> => {
    try {
        await adminService.rejectUser(req.params.id);

        res.status(HTTP_STATUS.OK).json(
            new ApiResponse(
                HTTP_STATUS.OK,
                "User rejected successfully.",
            ),
        );
    }
    catch (error) {
        next(error);
    }
};