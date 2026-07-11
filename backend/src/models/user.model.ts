import mongoose, { Schema } from "mongoose";
import { USER_ROLE_VALUES, USER_ROLES, USER_STATUS_VALUES, USER_STATUS } from "../constants/auth.constants";

export interface User extends Document {
    name: string;
    email: string;
    password: string;
    role: typeof USER_ROLE_VALUES[number];
    status: typeof USER_STATUS_VALUES[number];
    createdAt: Date;
    updatedAt: Date;
}

const userSchema = new Schema<User>(
    {
        name: {
            type: String,
            required: true,
            trim: true,
            minlength: 3,
            maxlength: 100,
        },

        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
        },

        password: {
            type: String,
            required: true,
            minlength: 6,
            select: false,
        },

        role: {
            type: String,
            enum: USER_ROLE_VALUES,
            default: USER_ROLES.STUDENT,
        },

        status: {
            type: String,
            enum: USER_STATUS_VALUES,
            default: USER_STATUS.ACTIVE,
        },
    },
    {
        timestamps: true,
    }
);

export const UserModel = mongoose.model<User>(
    "User",
    userSchema
);