import * as courseRepository from "../repositories/course.repository";
import type { CreateCourseRequest, UpdateCourseRequest, CourseDocument } from "../types/course.types";
import { AppError } from "../common/errors/app.error";
import { ERROR_CODES } from "../constants/error.codes.constants";
import { HTTP_STATUS } from "../constants/http.constants";

export const createCourse = async (data: CreateCourseRequest): Promise<CourseDocument> => {
    const exists = await courseRepository.findCourseByCode(data.courseCode);

    if (exists) {
        throw new AppError(
            ERROR_CODES.COURSE_ALREADY_EXISTS,
            "Course code already exists.",
            HTTP_STATUS.CONFLICT,
        );
    }

    return courseRepository.createCourse(data);
};

export const getCourseById = async (id: string): Promise<CourseDocument | null> => {
    return courseRepository.findCourseById(id);
};

export const getAllCourses = async (): Promise<CourseDocument[]> => {
    return courseRepository.getAllCourses();
};

export const getCoursesByLecturer = async (lecturerId: string): Promise<CourseDocument[]> => {
    return courseRepository.getCoursesByLecturer(lecturerId);
};

export const updateCourse = async (id: string, data: UpdateCourseRequest): Promise<CourseDocument | null> => {
    return courseRepository.updateCourse(id, data);
};

export const deleteCourse = async (id: string): Promise<CourseDocument | null> => {
    return courseRepository.deleteCourse(id);
};