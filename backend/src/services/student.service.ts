import * as studentRepository from "../repositories/student.repository";
import type { CreateStudentRequest, UpdateStudentRequest, StudentDocument } from "../types/student.types";

export const createStudent = async (userId: string, data: CreateStudentRequest): Promise<StudentDocument> => {
    return studentRepository.createStudent(userId, data);
};

export const getStudentById = async (id: string): Promise<StudentDocument | null> => {
    return studentRepository.findStudentById(id);
};

export const getStudentByUserId = async (userId: string): Promise<StudentDocument | null> => {
    return studentRepository.findStudentByUserId(userId);
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