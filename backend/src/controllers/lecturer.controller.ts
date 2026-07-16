import type { Request, Response, NextFunction } from "express";
import type { AuthenticatedRequest } from "../types/request.types";
import * as lecturerService from "../services/lecturer.service";
import { HTTP_STATUS } from "../constants/http.constants";
import { ApiResponse } from "../common/responses/api.response";

export const createLecturer = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const lecturer = await lecturerService.createLecturer(req.body.userId, req.body);
        res.status(HTTP_STATUS.CREATED).json(
            new ApiResponse(
                HTTP_STATUS.CREATED,
                "Lecturer created successfully.",
                lecturer,
            ),
        );
    }
    catch (error) {
        next(error);
    }
};

export const getAllLecturers = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const lecturers = await lecturerService.getAllLecturers();
        res.status(HTTP_STATUS.OK).json(
            new ApiResponse(
                HTTP_STATUS.OK,
                "Lecturers retrieved successfully.",
                lecturers,
            ),
        );
    }
    catch (error) {
        next(error);
    }
};

export const getLecturerById = async (req: Request<{ id: string }>, res: Response, next: NextFunction): Promise<void> => {
    try {
        const lecturer = await lecturerService.getLecturerById(req.params.id);
        res.status(HTTP_STATUS.OK).json(
            new ApiResponse(
                HTTP_STATUS.OK,
                "Lecturer retrieved successfully.",
                lecturer,
            ),
        );
    }
    catch (error) {
        next(error);
    }
};

export const updateLecturer = async (req: Request<{ id: string }>, res: Response, next: NextFunction): Promise<void> => {
    try {
        const lecturer = await lecturerService.updateLecturer(req.params.id, req.body);
        res.status(HTTP_STATUS.OK).json(
            new ApiResponse(
                HTTP_STATUS.OK,
                "Lecturer updated successfully.",
                lecturer,
            ),
        );
    }
    catch (error) {
        next(error);
    }
};

export const deleteLecturer = async (req: Request<{ id: string }>, res: Response, next: NextFunction): Promise<void> => {
    try {
        const result = await lecturerService.deleteLecturer(req.params.id);
        res.status(HTTP_STATUS.OK).json(
            new ApiResponse(
                HTTP_STATUS.OK,
                "Lecturer deleted successfully.",
                result,
            ),
        );
    }
    catch (error) {
        next(error);
    }
};