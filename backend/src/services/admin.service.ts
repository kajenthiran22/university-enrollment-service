import * as adminRepository from "../repositories/admin.repository";
import { USER_STATUS } from "../constants/auth.constants";
import { AppError } from "../common/errors/app.error";
import { ERROR_CODES } from "../constants/error.codes.constants";
import { HTTP_STATUS } from "../constants/http.constants";

export const getPendingUsers = async () => {
    return adminRepository.getPendingUsers();
};

export const approveUser = async (userId: string): Promise<void> => {
    const user = await adminRepository.findUserById(userId);

    if (!user) {
        throw new AppError(
            ERROR_CODES.USER_NOT_FOUND,
            "User not found.",
            HTTP_STATUS.NOT_FOUND,
        );
    }

    await adminRepository.updateUserStatus(
        userId,
        USER_STATUS.APPROVED,
    );
};

export const rejectUser = async (userId: string): Promise<void> => {
    const user = await adminRepository.findUserById(userId);

    if (!user) {
        throw new AppError(
            ERROR_CODES.USER_NOT_FOUND,
            "User not found.",
            HTTP_STATUS.NOT_FOUND,
        );
    }

    await adminRepository.updateUserStatus(
        userId,
        USER_STATUS.REJECTED,
    );
};