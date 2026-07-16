import type { Request, Response, NextFunction } from "express";
import * as courseService from "../services/course.service";
import { HTTP_STATUS } from "../constants/http.constants";

export const createCourse = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const course = await courseService.createCourse(req.body);
        res.status(HTTP_STATUS.CREATED).json(course);
    }
    catch(error) {
        next(error);
    }
};

export const getAllCourses = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const courses = await courseService.getAllCourses();
        res.status(HTTP_STATUS.OK).json(courses);
    }
    catch(error) {
        next(error);
    }
};

export const getCourseById = async (req: Request<{ id: string }>, res: Response, next: NextFunction): Promise<void> => {
    try {
        const course = await courseService.getCourseById(req.params.id);
        res.status(HTTP_STATUS.OK).json(course);
    }
    catch(error) {
        next(error);
    }
};

export const getCoursesByLecturer = async (req: Request<{ lecturerId: string }>, res: Response, next: NextFunction): Promise<void> => {
    try {
        const course = await courseService.getCoursesByLecturer(req.params.lecturerId);
        res.status(HTTP_STATUS.OK).json(course);
    }
    catch(error) {
        next(error);
    }
};

export const updateCourse = async (req: Request<{ id: string }>, res: Response, next: NextFunction): Promise<void> => {
    try {
        const course = await courseService.updateCourse(req.params.id, req.body);
        res.status(HTTP_STATUS.OK).json(course);
    }
    catch(error) {
        next(error);
    }
};

export const deleteCourse = async (req: Request<{ id: string }>, res: Response, next: NextFunction): Promise<void> => {
    try {
        await courseService.deleteCourse(req.params.id);
        res.sendStatus(HTTP_STATUS.NO_CONTENT);
    }
    catch(error) {
        next(error);
    }
};