import type { Request, Response, NextFunction } from "express";
import * as studentService from "../services/student.service";
import { HTTP_STATUS } from "../constants/http.constants";
import { ApiResponse } from "../common/responses/api.response";

export const createStudent = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const student = await studentService.createStudent(req.body.userId, req.body);
        res.status(HTTP_STATUS.CREATED).json(
            new ApiResponse(
                HTTP_STATUS.CREATED,
                "Student created successfully.",
                student,
            ),
        );
    }
    catch (error) {
        next(error);
    }
};

export const getStudentById = async (req: Request<{ id: string }>, res: Response, next: NextFunction): Promise<void> => {
    try {
        const student = await studentService.getStudentById(req.params.id);
        res.status(HTTP_STATUS.OK).json(
            new ApiResponse(
                HTTP_STATUS.OK,
                "Student retrieved successfully.",
                student,
            ),
        );
    }
    catch (error) {
        next(error);
    }
};

export const getAllStudents = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const students = await studentService.getAllStudents();
        res.status(HTTP_STATUS.OK).json(
            new ApiResponse(
                HTTP_STATUS.OK,
                "Students retrieved successfully.",
                students,
            ),
        );
    }
    catch (error) {
        next(error);
    }
};

export const updateStudent = async (req: Request<{ id: string }>, res: Response, next: NextFunction): Promise<void> => {
    try {
        const student = await studentService.updateStudent(req.params.id, req.body);
        res.status(HTTP_STATUS.OK).json(
            new ApiResponse(
                HTTP_STATUS.OK,
                "Student updated successfully.",
                student,
            ),
        );
    }
    catch (error) {
        next(error);
    }
};

export const deleteStudent = async (req: Request<{ id: string }>, res: Response, next: NextFunction): Promise<void> => {
    try {
        const result = await studentService.deleteStudent(req.params.id);
        res.status(HTTP_STATUS.OK).json(
            new ApiResponse(
                HTTP_STATUS.OK,
                "Student deleted successfully.",
                result,
            ),
        );
    }
    catch (error) {
        next(error);
    }
};