import { CourseModel } from "../models/course.model";
import type { CreateCourseRequest, UpdateCourseRequest, CourseDocument } from "../types/course.types";

export const createCourse = async (data: CreateCourseRequest): Promise<CourseDocument> => {
    return CourseModel.create(data);
};

export const findCourseById = async (id: string): Promise<CourseDocument | null> => {
    return CourseModel.findById(id).populate("lecturerId");
};

export const findCourseByCode = async (courseCode: string): Promise<CourseDocument | null> => {
    return CourseModel.findOne({ courseCode });
};

export const getAllCourses = async (): Promise<CourseDocument[]> => {
    return CourseModel.find().populate("lecturerId");
};

export const getCoursesByLecturer = async (lecturerId: string): Promise<CourseDocument[]> => {
    return CourseModel.find({ lecturerId });
};

export const updateCourse = async (id: string, data: UpdateCourseRequest): Promise<CourseDocument | null> => {
    return CourseModel.findByIdAndUpdate(id, data, { new: true, runValidators: true });
};

export const deleteCourse = async (id: string): Promise<CourseDocument | null> => {
    return CourseModel.findByIdAndDelete(id);
};