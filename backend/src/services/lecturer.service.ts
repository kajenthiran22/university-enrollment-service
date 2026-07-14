import * as lecturerRepository from "../repositories/lecturer.repository";
import type { CreateLecturerRequest, UpdateLecturerRequest, LecturerDocument } from "../types/lecturer.types";
import { AppError } from "../common/errors/app.error";
import { ERROR_CODES } from "../constants/error.codes.constants";
import { HTTP_STATUS } from "../constants/http.constants";

export const createLecturer = async (userId: string, data: CreateLecturerRequest): Promise<LecturerDocument> => {
    const exists = await lecturerRepository.findLecturerByEmployeeId(data.employeeId);

    if (exists) {
        throw new AppError(
            ERROR_CODES.LECTURER_ALREADY_EXISTS,
            "Employee ID already exists.",
            HTTP_STATUS.CONFLICT,
        );
    }

    return lecturerRepository.createLecturer(userId, data);
};

export const getLecturerById = async (id: string): Promise<LecturerDocument | null> => {
    return lecturerRepository.findLecturerById(id);
};

export const getLecturerByUserId = async (userId: string): Promise<LecturerDocument | null> => {
    return lecturerRepository.findLecturerByUserId(userId);
};

export const getAllLecturers = async (): Promise<LecturerDocument[]> => {
    return lecturerRepository.getAllLecturers();
};

export const updateLecturer = async (id: string, data: UpdateLecturerRequest): Promise<LecturerDocument | null> => {
    return lecturerRepository.updateLecturer(id, data);
};

export const deleteLecturer = async (id: string): Promise<LecturerDocument | null> => {
    return lecturerRepository.deleteLecturer(id);
};