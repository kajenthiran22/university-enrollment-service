import mongoose, { Schema } from "mongoose";
import type { Lecturer } from "../types/lecturer.types";

const lecturerSchema = new Schema<Lecturer>(
    {
        userId: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
            unique: true,
        },

        employeeId: {
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

        designation: {
            type: String,
            required: true,
            trim: true,
        },
    },
    {
        timestamps: true,
    }
);

export const LecturerModel = mongoose.model<Lecturer>("Lecturer", lecturerSchema);
