import type { Request, Response, NextFunction } from "express";
import * as authService from "../services/auth.service";
import { HTTP_STATUS } from "../constants/http.constants";
import { ApiResponse } from "../common/responses/api.response";

export const studentRegister = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const result = await authService.studentRegister(req.body);
        res.status(HTTP_STATUS.CREATED).json(
            new ApiResponse(
                HTTP_STATUS.CREATED,
                "Student registered successfully.",
                result,
            ),
        );
    }
    catch (error) {
        next(error);
    }
};

export const lecturerRegister = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const result = await authService.lecturerRegister(req.body);
        res.status(HTTP_STATUS.CREATED).json(
            new ApiResponse(
                HTTP_STATUS.CREATED,
                "Lecturer registered successfully.",
                result,
            ),
        );
    }
    catch (error) {
        next(error);
    }
};

export const login = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const result = await authService.login(req.body);
        res.status(HTTP_STATUS.OK).json(
            new ApiResponse(
                HTTP_STATUS.OK,
                "User logged in successfully.",
                result,
            ),
        );
    }
    catch (error) {
        next(error);
    }
};

export const logout = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        await authService.logout();

        res.status(HTTP_STATUS.OK).json(
            new ApiResponse(
                HTTP_STATUS.OK,
                "User logged out successfully.",
            ),
        );
    }
    catch (error) {
        next(error);
    }
};