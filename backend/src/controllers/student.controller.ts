import type { Request, Response, NextFunction } from "express";
import * as studentService from "../services/student.service";
import { HTTP_STATUS } from "../constants/http.constants";

export const createStudent = async (req: Request<{ userId: string }>, res: Response, next: NextFunction): Promise<void> => {
    try {
        const student = await studentService.createStudent(req.params.userId, req.body);
        res.status(HTTP_STATUS.CREATED).json(student);
    }
    catch (error) {
        next(error);
    }
};

export const getStudentById = async (req: Request<{ id: string }>, res: Response, next: NextFunction): Promise<void> => {
    try {
        const student = await studentService.getStudentById(req.params.id);
        res.status(HTTP_STATUS.OK).json(student);
    }
    catch (error) {
        next(error);
    }
};

export const getAllStudents = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const students = await studentService.getAllStudents();
        res.status(HTTP_STATUS.OK).json(students);
    }
    catch (error) {
        next(error);
    }
};

export const updateStudent = async (req: Request<{ id: string }>, res: Response, next: NextFunction): Promise<void> => {
    try {
        const student = await studentService.updateStudent(req.params.id, req.body);
        res.status(HTTP_STATUS.OK).json(student);
    }
    catch (error) {
        next(error);
    }
};

export const deleteStudent = async (req: Request<{ id: string }>, res: Response, next: NextFunction): Promise<void> => {
    try {
        await studentService.deleteStudent(req.params.id);
        res.sendStatus(HTTP_STATUS.NO_CONTENT);
    }
    catch (error) {
        next(error);
    }
};