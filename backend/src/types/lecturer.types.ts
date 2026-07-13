import type { HydratedDocument, Types } from "mongoose";

export interface Lecturer {
    userId: Types.ObjectId;
    employeeId: string;
    name: string;
    designation: string;
    createdAt: Date;
    updatedAt: Date;
}

export type LecturerDocument = HydratedDocument<Lecturer>;

export interface CreateLecturerRequest {
    employeeId: string;
    name: string;
    designation: string;
}

export type UpdateLecturerRequest = Partial<CreateLecturerRequest>;
