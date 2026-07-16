import * as studentRepository from "../repositories/student.repository";
import type { CreateStudentRequest, UpdateStudentRequest, StudentDocument } from "../types/student.types";
import { AppError } from "../common/errors/app.error";
import { ERROR_CODES } from "../constants/error.codes.constants";
import { HTTP_STATUS } from "../constants/http.constants";

export const createStudent = async (userId: string, data: CreateStudentRequest): Promise<StudentDocument> => {
    const exists = await studentRepository.findStudentByUserId(userId);

    if (exists) {
        throw new AppError(
            ERROR_CODES.STUDENT_ALREADY_EXISTS,
            "Registration Number already exists.",
            HTTP_STATUS.CONFLICT,
        );
    }

    return studentRepository.createStudent(userId, data);
};

export const getStudentById = async (id: string): Promise<StudentDocument | null> => {
    return studentRepository.findStudentById(id);
};

export const getAllStudents = async (): Promise<StudentDocument[]> => {
    return studentRepository.getAllStudents();
};

export const updateStudent = async (id: string, data: UpdateStudentRequest): Promise<StudentDocument | null> => {
    return studentRepository.updateStudent(id, data);
};

export const deleteStudent = async (id: string): Promise<StudentDocument | null> => {
    return studentRepository.deleteStudent(id);
};