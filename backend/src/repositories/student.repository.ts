import { StudentModel } from "../models/student.model";
import type { StudentDocument, CreateStudentRequest, UpdateStudentRequest } from "../types/student.types";

export const createStudent = async (userId: string, data: CreateStudentRequest): Promise<StudentDocument> => {
    return StudentModel.create({
        userId,
        ...data,
    });
};

export const findStudentById = async (id: string): Promise<StudentDocument | null> => {
    return StudentModel.findById(id);
};

export const findStudentByUserId = async (userId: string): Promise<StudentDocument | null> => {
    return StudentModel.findOne({ userId });
};

export const getAllStudents = async (): Promise<StudentDocument[]> => {
    return StudentModel.find();
};

export const updateStudent = async (id: string, data: UpdateStudentRequest): Promise<StudentDocument | null> => {
    return StudentModel.findByIdAndUpdate(
        id,
        data,
        {
            new: true,
            runValidators: true,
        },
    );
};

export const deleteStudent = async (id: string): Promise<StudentDocument | null> => {
    return StudentModel.findByIdAndDelete(id);
};