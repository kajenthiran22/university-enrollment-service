import type { Request, Response, NextFunction } from "express";
import type { AuthenticatedRequest } from "../types/request.types";
import * as lecturerService from "../services/lecturer.service";
import { HTTP_STATUS } from "../constants/http.constants";

export const createLecturer = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const lecturer = await lecturerService.createLecturer(req.body.userId, req.body);
        res.status(HTTP_STATUS.CREATED).json(lecturer);
    }
    catch (error) {
        next(error);
    }
};

export const getAllLecturers = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const lecturers = await lecturerService.getAllLecturers();
        res.status(HTTP_STATUS.OK).json(lecturers);
    }
    catch (error) {
        next(error);
    }
};

export const getLecturerById = async (req: Request<{ id: string }>, res: Response, next: NextFunction): Promise<void> => {
    try {
        const lecturer = await lecturerService.getLecturerById(req.params.id);
        res.status(HTTP_STATUS.OK).json(lecturer);
    }
    catch (error) {
        next(error);
    }
};

export const getMyLecturerProfile = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
        const lecturer = await lecturerService.getLecturerByUserId(req.user!.userId);
        res.status(HTTP_STATUS.OK).json(lecturer);
    }
    catch (error) {
        next(error);
    }
};

export const updateLecturer = async (req: Request<{ id: string }>, res: Response, next: NextFunction): Promise<void> => {
    try {
        const lecturer = await lecturerService.updateLecturer(req.params.id, req.body);
        res.status(HTTP_STATUS.OK).json(lecturer);
    }
    catch (error) {
        next(error);
    }
};

export const deleteLecturer = async (req: Request<{ id: string }>, res: Response, next: NextFunction): Promise<void> => {
    try {
        await lecturerService.deleteLecturer(req.params.id);
        res.sendStatus(HTTP_STATUS.NO_CONTENT);
    }
    catch (error) {
        next(error);
    }
};