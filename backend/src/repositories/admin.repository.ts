import { UserModel } from "../models/user.model";
import type { UserDocument } from "../types/user.types";

export const getPendingUsers = async (): Promise<UserDocument[]> => {
    return UserModel.find({
        status: "PENDING",
    });
};

export const findUserById = async (id: string): Promise<UserDocument | null> => {
    return UserModel.findById(id);
};

export const updateUserStatus = async (id: string, status: string): Promise<UserDocument | null> => {
    return UserModel.findByIdAndUpdate(
        id,
        { status },
        {
            new: true,
            runValidators: true,
        },
    );
};