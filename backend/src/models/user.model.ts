import mongoose, { Schema } from "mongoose";
import type { User } from "../types/user.types";
import { USER_ROLE_VALUES, USER_ROLES, USER_STATUS_VALUES, USER_STATUS } from "../constants/auth.constants";

const userSchema = new Schema<User>(
    {
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