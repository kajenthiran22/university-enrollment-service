import type { HydratedDocument, Types } from "mongoose";

export interface Course {
    courseCode: string;
    title: string;
    credits: number;
    lecturerId: Types.ObjectId;
    capacity: number;
    enrolledCount: number;
    enrollmentOpen: boolean;
    createdAt: Date;
    updatedAt: Date;
}

export type CourseDocument = HydratedDocument<Course>;

export interface CreateCourseRequest {
    courseCode: string;
    title: string;
    credits: number;
    lecturerId: string;
    capacity: number;
}

export interface UpdateCourseRequest {
    title?: string;
    credits?: number;
    capacity?: number;
    enrollmentOpen?: boolean;
    enrolledCount?: number;
}