import type { Request, Response, NextFunction } from "express";
import * as enrollmentService from "../services/enrollment.service";
import { HTTP_STATUS } from "../constants/http.constants";
import { ApiResponse } from "../common/responses/api.response";

export const enrollStudent = async (req: Request<{ id: string }>, res: Response, next: NextFunction): Promise<void> => {
    try {
        const enrollment = await enrollmentService.enrollStudent(
            req.user!.userId,
            req.params!.id,
        );
        res.status(HTTP_STATUS.CREATED).json(
            new ApiResponse(
                HTTP_STATUS.CREATED,
                "Enrollment created successfully.",
                enrollment,
            ),
        );
    }
    catch (error) {
        next(error);
    }
};

export const withdrawStudent = async (req: Request<{ id: string }>, res: Response, next: NextFunction): Promise<void> => {
    try {
        const enrollment = await enrollmentService.withdrawStudent(
            req.user!.userId,
            req.params.id,
        );
        res.status(HTTP_STATUS.OK).json(
            new ApiResponse(
                HTTP_STATUS.OK,
                "Enrollment withdrawn successfully.",
                enrollment,
            )
        )
    }
    catch (error) {
        next(error);
    }
};

export const getAllEnrollments = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const enrollments = await enrollmentService.getAllEnrollments();
        res.status(HTTP_STATUS.OK).json(
            new ApiResponse(
                HTTP_STATUS.OK,
                "Enrollments retrieved successfully.",
                enrollments,
            ),
        );
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
        res.status(HTTP_STATUS.OK).json(
            new ApiResponse(
                HTTP_STATUS.OK,
                "Enrollment retrieved successfully.",
                enrollment,
            ),
        );
    }
    catch (error) {
        next(error);
    }
};

export const getEnrollmentsByStudent = async (req: Request<{ id: string }>, res: Response, next: NextFunction): Promise<void> => {
    try {
        const enrollments = await enrollmentService.getEnrollmentsByStudent(
            req.params.id,
        );
        res.status(HTTP_STATUS.OK).json(
            new ApiResponse(
                HTTP_STATUS.OK,
                "Enrollments retrieved successfully.",
                enrollments,
            ),
        );
    }
    catch (error) {
        next(error);
    }
};

export const getEnrollmentsByCourse = async (req: Request<{ id: string }>, res: Response, next: NextFunction): Promise<void> => {
    try {
        const enrollments = await enrollmentService.getEnrollmentsByCourse(
            req.params.id,
        );
        res.status(HTTP_STATUS.OK).json(
            new ApiResponse(
                HTTP_STATUS.OK,
                "Enrollments retrieved successfully.",
                enrollments,
            ),
        );
    }
    catch (error) {
        next(error);
    }
};

export const deleteEnrollment = async (req: Request<{ id: string }>, res: Response, next: NextFunction): Promise<void> => {
    try {
        const result = await enrollmentService.deleteEnrollment(
            req.params.id,
        );
        res.status(HTTP_STATUS.OK).json(
            new ApiResponse(
                HTTP_STATUS.OK,
                "Enrollments deleted successfully.",
                result,
            ),
        );
    }
    catch (error) {
        next(error);
    }
};