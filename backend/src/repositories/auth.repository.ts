import { UserModel } from "../models/user.model";
import type { User, UserDocument } from "../types/user.types";

export const findUserByEmail = async (email: string): Promise<UserDocument | null> => {
    return UserModel.findOne({ email }).select("+password").exec();
};

export const createUser = async (userData: Partial<User>): Promise<UserDocument> => {
    const user = new UserModel(userData);
    return user.save();
};

export const userExistsByEmail = async (email: string): Promise<boolean> => {
    const user = await UserModel.exists({ email });
    return user !== null;
};
