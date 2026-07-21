import { CourseModel } from "../models/course.model";
import type { CreateCourseRequest, UpdateCourseRequest, CourseDocument } from "../types/course.types";
import type { ClientSession, UpdateQuery } from "mongoose";

export const createCourse = async (data: CreateCourseRequest): Promise<CourseDocument> => {
    return CourseModel.create(data);
};

export const findCourseById = async (id: string, session?: ClientSession): Promise<CourseDocument | null> => {
    const query = CourseModel.findById(id).populate("lecturerId");

    if (session) {
        query.session(session);
    }

    return query;
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

export const updateCourse = async (id: string, data: UpdateQuery<CourseDocument>, session?: ClientSession): Promise<CourseDocument | null> => {
    const query = CourseModel.findByIdAndUpdate(id, data, { new: true, runValidators: true });

    if (session) {
        query.session(session);
    }

    return query;
};

export const deleteCourse = async (id: string): Promise<CourseDocument | null> => {
    return CourseModel.findByIdAndDelete(id);
};