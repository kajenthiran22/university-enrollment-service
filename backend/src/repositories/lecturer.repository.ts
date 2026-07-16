import { LecturerModel } from "../models/lecturer.model";
import type { LecturerDocument, CreateLecturerRequest, UpdateLecturerRequest } from "../types/lecturer.types";

export const createLecturer = async (userId: string, data: CreateLecturerRequest): Promise<LecturerDocument> => {
    return LecturerModel.create({
        userId,
        ...data,
    });
};

export const findLecturerById = async (id: string): Promise<LecturerDocument | null> => {
    return LecturerModel.findById(id);
};

export const findLecturerByUserId = async (userId: string): Promise<LecturerDocument | null> => {
    return LecturerModel.findOne({ userId });
};

export const getAllLecturers = async (): Promise<LecturerDocument[]> => {
    return LecturerModel.find();
};

export const updateLecturer = async (id: string, data: UpdateLecturerRequest): Promise<LecturerDocument | null> => {
    return LecturerModel.findByIdAndUpdate(
        id,
        data,
        {
            new: true,
            runValidators: true,
        },
    );
};

export const deleteLecturer = async (id: string): Promise<LecturerDocument | null> => {
    return LecturerModel.findByIdAndDelete(id);
};