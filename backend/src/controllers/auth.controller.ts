import type { Request, Response, NextFunction } from "express";
import * as authService from "../services/auth.service";
import { HTTP_STATUS } from "../constants/http.constants";

export const register = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const result = await authService.register(req.body);
        res.status(HTTP_STATUS.CREATED).json(result);
    }
    catch (error) {
        next(error);
    }
};

export const login = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const result = await authService.login(req.body);
        res.status(HTTP_STATUS.OK).json(result);
    }
    catch (error) {
        next(error);
    }
};