import type { Request, Response, NextFunction } from "express";
import * as courseService from "../services/course.service";
import { HTTP_STATUS } from "../constants/http.constants";
import { ApiResponse } from "../common/responses/api.response";

export const createCourse = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const course = await courseService.createCourse(req.body);
        res.status(HTTP_STATUS.CREATED).json(
            new ApiResponse(
                HTTP_STATUS.CREATED,
                "Course created successfully.",
                course,
            ),
        );
    }
    catch (error) {
        next(error);
    }
};

export const getAllCourses = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const courses = await courseService.getAllCourses();
        res.status(HTTP_STATUS.OK).json(
            new ApiResponse(
                HTTP_STATUS.OK,
                "Courses retrieved successfully.",
                courses,
            ),
        );
    }
    catch (error) {
        next(error);
    }
};

export const getCourseById = async (req: Request<{ id: string }>, res: Response, next: NextFunction): Promise<void> => {
    try {
        const course = await courseService.getCourseById(req.params.id);
        res.status(HTTP_STATUS.OK).json(
            new ApiResponse(
                HTTP_STATUS.OK,
                "Course retrieved successfully.",
                course,
            ),
        );
    }
    catch (error) {
        next(error);
    }
};

export const getCoursesByLecturer = async (req: Request<{ id: string }>, res: Response, next: NextFunction): Promise<void> => {
    try {
        const courses = await courseService.getCoursesByLecturer(req.params.id);
        res.status(HTTP_STATUS.OK).json(
            new ApiResponse(
                HTTP_STATUS.OK,
                "Courses retrieved successfully.",
                courses,
            ),
        );
    }
    catch (error) {
        next(error);
    }
};

export const updateCourse = async (req: Request<{ id: string }>, res: Response, next: NextFunction): Promise<void> => {
    try {
        const course = await courseService.updateCourse(req.params.id, req.body);
        res.status(HTTP_STATUS.OK).json(
            new ApiResponse(
                HTTP_STATUS.OK,
                "Course updated successfully.",
                course,
            ),
        );
    }
    catch (error) {
        next(error);
    }
};

export const deleteCourse = async (req: Request<{ id: string }>, res: Response, next: NextFunction): Promise<void> => {
    try {
        const result = await courseService.deleteCourse(req.params.id);
        res.status(HTTP_STATUS.OK).json(
            new ApiResponse(
                HTTP_STATUS.OK,
                "Course deleted successfully.",
                result,
            ),
        );
    }
    catch (error) {
        next(error);
    }
};