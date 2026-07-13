import type { HydratedDocument, Types } from "mongoose";

export interface Student {
    userId: Types.ObjectId;
    registrationNumber: string;
    name: string;
    dateOfBirth: Date;
    createdAt: Date;
    updatedAt: Date;
}

export type StudentDocument = HydratedDocument<Student>;

export interface CreateStudentRequest {
    registrationNumber: string;
    name: string;
    dateOfBirth: Date;
}

export interface UpdateStudentRequest {
    registrationNumber?: string;
    name?: string;
    dateOfBirth?: Date;
}