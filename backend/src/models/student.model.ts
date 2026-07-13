import mongoose, { Schema } from "mongoose";
import type { Student } from "../types/student.types";

const studentSchema = new Schema<Student>(
    {
        userId: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
            unique: true,
        },

        registrationNumber: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            uppercase: true,
        },

        name: {
            type: String,
            required: true,
            trim: true,
            minlength: 3,
            maxlength: 100,
        },

        dateOfBirth: {
            type: Date,
            required: true,
        },
    },
    {
        timestamps: true,
    },
);

export const StudentModel = mongoose.model<Student>(
    "Student",
    studentSchema,
);