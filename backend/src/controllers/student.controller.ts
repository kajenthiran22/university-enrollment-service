import type { Request, Response, NextFunction } from "express";
import * as studentService from "../services/student.service";

export const createStudent = async (req: Request<{ userId: string }>, res: Response, next: NextFunction): Promise<void> => {
    try {
        const student = await studentService.createStudent(req.params.userId, req.body);
        res.status(201).json(student);
    }
    catch (error) {
        next(error);
    }
};

export const getStudentById = async (req: Request<{ id: string }>, res: Response, next: NextFunction): Promise<void> => {
    try {
        const student = await studentService.getStudentById(req.params.id);
        res.status(200).json(student);
    }
    catch (error) {
        next(error);
    }
};

export const getAllStudents = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const students = await studentService.getAllStudents();
        res.status(200).json(students);
    }
    catch (error) {
        next(error);
    }
};

export const updateStudent = async (req: Request<{ id: string }>, res: Response, next: NextFunction): Promise<void> => {
    try {
        const student = await studentService.updateStudent(req.params.id, req.body);
        res.status(200).json(student);
    }
    catch (error) {
        next(error);
    }
};

export const deleteStudent = async (req: Request<{ id: string }>, res: Response, next: NextFunction): Promise<void> => {
    try {
        await studentService.deleteStudent(req.params.id);
        res.sendStatus(204);
    }
    catch (error) {
        next(error);
    }
};