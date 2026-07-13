import type { Request, Response, NextFunction } from "express";
import type { AuthenticatedRequest } from "../types/request.types";
import * as lecturerService from "../services/lecturer.service";

export const createLecturer = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const lecturer = await lecturerService.createLecturer(req.body.userId, req.body);
        res.status(201).json(lecturer);
    }
    catch (error) {
        next(error);
    }
};

export const getAllLecturers = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const lecturers = await lecturerService.getAllLecturers();
        res.status(200).json(lecturers);
    }
    catch (error) {
        next(error);
    }
};

export const getLecturerById = async (req: Request<{ id: string }>, res: Response, next: NextFunction): Promise<void> => {
    try {
        const lecturer = await lecturerService.getLecturerById(req.params.id);
        res.status(200).json(lecturer);
    }
    catch (error) {
        next(error);
    }
};

export const getMyLecturerProfile = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
        const lecturer = await lecturerService.getLecturerByUserId(req.user!.userId);
        res.status(200).json(lecturer);
    }
    catch (error) {
        next(error);
    }
};

export const updateLecturer = async (req: Request<{ id: string }>, res: Response, next: NextFunction): Promise<void> => {
    try {
        const lecturer = await lecturerService.updateLecturer(req.params.id, req.body);
        res.status(200).json(lecturer);
    }
    catch (error) {
        next(error);
    }
};

export const deleteLecturer = async (req: Request<{ id: string }>, res: Response, next: NextFunction): Promise<void> => {
    try {
        await lecturerService.deleteLecturer(req.params.id);
        res.sendStatus(204);
    }
    catch (error) {
        next(error);
    }
};