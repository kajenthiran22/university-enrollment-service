import type { Request, Response, NextFunction } from "express";
import * as enrollmentService from "../services/enrollment.service";
import { HTTP_STATUS } from "../constants/http.constants";

export const enrollStudent = async (req: Request<{ courseId: string }>, res: Response, next: NextFunction): Promise<void> => {
    try {
        const enrollment = await enrollmentService.enrollStudent(
            req.user!.userId,
            req.params!.courseId,
        );
        res.status(HTTP_STATUS.CREATED).json(enrollment);
    }
    catch (error) {
        next(error);
    }
};

export const withdrawStudent = async (req: Request<{ courseId: string }>, res: Response, next: NextFunction): Promise<void> => {
    try {
        const enrollment = await enrollmentService.withdrawStudent(
            req.user!.userId,
            req.params.courseId,
        );
        res.status(HTTP_STATUS.OK).json(enrollment);
    }
    catch (error) {
        next(error);
    }
};

export const getAllEnrollments = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const enrollments = await enrollmentService.getAllEnrollments();
        res.status(HTTP_STATUS.OK).json(enrollments);
    }
    catch (error) {
        next(error);
    }
};

export const getMyEnrollments = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const enrollments = await enrollmentService.getStudentEnrollments(
            req.user!.userId,
        );
        res.status(HTTP_STATUS.OK).json(enrollments);
    }
    catch (error) {
        next(error);
    }
};

export const getEnrollmentById = async (req: Request<{ id: string }>, res: Response, next: NextFunction): Promise<void> => {
    try {
        const enrollment = await enrollmentService.getEnrollmentById(
            req.params.id,
        );
        res.status(HTTP_STATUS.OK).json(enrollment);
    }
    catch (error) {
        next(error);
    }
};

export const getCourseEnrollments = async (req: Request<{ courseId: string }>, res: Response, next: NextFunction): Promise<void> => {
    try {
        const enrollments = await enrollmentService.getCourseEnrollments(
            req.params.courseId,
        );
        res.status(HTTP_STATUS.OK).json(enrollments);
    }
    catch (error) {
        next(error);
    }
};

export const deleteEnrollment = async (req: Request<{ id: string }>, res: Response, next: NextFunction): Promise<void> => {
    try {
        await enrollmentService.deleteEnrollment(
            req.params.id,
        );
        res.status(HTTP_STATUS.NO_CONTENT).send();
    }
    catch (error) {
        next(error);
    }
};