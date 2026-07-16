import type { HydratedDocument, Types } from "mongoose";
import { ENROLLMENT_STATUS_VALUES } from "../constants/enrollment.constants";

export interface Enrollment {
    studentId: Types.ObjectId;
    courseId: Types.ObjectId;
    status: typeof ENROLLMENT_STATUS_VALUES[number];
    enrolledAt: Date;
    withdrawnAt?: Date;
    createdAt: Date;
    updatedAt: Date;
}

export type EnrollmentDocument = HydratedDocument<Enrollment>;

export interface CreateEnrollmentRequest {
    studentId: string;
    courseId: string;
    status: typeof ENROLLMENT_STATUS_VALUES[number];
    enrolledAt: Date;
}

export interface UpdateEnrollmentRequest {
    status?: typeof ENROLLMENT_STATUS_VALUES[number];
}