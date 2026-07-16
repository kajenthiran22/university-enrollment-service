import mongoose, { Schema } from "mongoose";
import type { Enrollment } from "../types/enrollment.types";
import { ENROLLMENT_STATUS, ENROLLMENT_STATUS_VALUES } from "../constants/enrollment.constants";

const enrollmentSchema = new Schema<Enrollment>(
    {
        studentId: {
            type: Schema.Types.ObjectId,
            ref: "Student",
            required: true,
        },

        courseId: {
            type: Schema.Types.ObjectId,
            ref: "Course",
            required: true,
        },

        status: {
            type: String,
            enum: ENROLLMENT_STATUS_VALUES,
            default: ENROLLMENT_STATUS.ACTIVE,
        },

        enrolledAt: {
            type: Date,
            default: Date.now,
        },

        withdrawnAt: {
            type: Date,
        },
    },
    {
        timestamps: true,
    }
);

enrollmentSchema.index(
    {
        studentId: 1,
        courseId: 1,
    },
    {
        unique: true,
    }
);

export const EnrollmentModel = mongoose.model<Enrollment>(
    "Enrollment",
    enrollmentSchema,
);