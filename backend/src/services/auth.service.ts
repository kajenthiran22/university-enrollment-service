import * as authRepository from "../repositories/auth.repository";
import { comparePassword, hashPassword } from "../utils/password.util";
import { generateAccessToken, generateRefreshToken } from "../utils/jwt.util";
import type { AuthResponse, JwtPayload, StudentRegisterRequest, LecturerRegisterRequest, LoginRequest, AuthUser } from "../types/auth.types";
import { AppError } from "../common/errors/app.error";
import { ERROR_CODES } from "../constants/error.codes.constants";
import { HTTP_STATUS } from "../constants/http.constants";
import * as studentRepository from "../repositories/student.repository";
import * as lecturerRepository from "../repositories/lecturer.repository";
import { USER_ROLES, USER_STATUS } from "../constants/auth.constants";

export const studentRegister = async (data: StudentRegisterRequest): Promise<AuthUser> => {
    const emailExists = await authRepository.userExistsByEmail(data.email);

    if (emailExists) {
        throw new AppError(
            ERROR_CODES.EMAIL_ALREADY_EXISTS,
            "Email already exists.",
            HTTP_STATUS.CONFLICT,
        );
    }

    const hashedPassword = await hashPassword(
        data.password
    );

    const user = await authRepository.createUser({
        email: data.email,
        password: hashedPassword,
        role: USER_ROLES.STUDENT,
        status: USER_STATUS.PENDING,
    });

    await studentRepository.createStudent(user.id, {
        registrationNumber: data.registrationNumber,
        name: data.name,
        dateOfBirth: data.dateOfBirth,
    });

    return user;
};

export const lecturerRegister = async (data: LecturerRegisterRequest): Promise<AuthUser> => {
    const emailExists = await authRepository.userExistsByEmail(data.email);

    if (emailExists) {
        throw new AppError(
            ERROR_CODES.EMAIL_ALREADY_EXISTS,
            "Email already exists.",
            HTTP_STATUS.CONFLICT,
        );
    }

    const hashedPassword = await hashPassword(
        data.password
    );

    const user = await authRepository.createUser({
        email: data.email,
        password: hashedPassword,
        role: USER_ROLES.LECTURER,
        status: USER_STATUS.PENDING,
    });

    await lecturerRepository.createLecturer(user.id, {
        employeeId: data.employeeId,
        name: data.name,
        designation: data.designation,
    });

    return user;
};

export const login = async (data: LoginRequest): Promise<AuthResponse> => {
    const user = await authRepository.findUserByEmail(data.email);

    if (!user) {
        throw new AppError(
            ERROR_CODES.INVALID_CREDENTIALS,
            "Invalid email or password.",
            HTTP_STATUS.UNAUTHORIZED,
        );
    }

    const passwordMatches = await comparePassword(
        data.password,
        user.password,
    );

    if (!passwordMatches) {
        throw new AppError(
            ERROR_CODES.INVALID_CREDENTIALS,
            "Invalid email or password.",
            HTTP_STATUS.UNAUTHORIZED,
        );
    }

    if (user.status !== USER_STATUS.APPROVED) {
        throw new AppError(
            ERROR_CODES.ACCOUNT_NOT_APPROVED,
            "Your account is awaiting administrator approval.",
            HTTP_STATUS.FORBIDDEN,
        );
    }

    const payload: JwtPayload = {
        userId: user.id,
        email: user.email,
        role: user.role,
    };

    return {
        user: {
            id: user.id,
            email: user.email,
            role: user.role,
        },

        tokens: {
            accessToken: generateAccessToken(payload),
            refreshToken: generateRefreshToken(payload),
        },
    };
};

export const logout = async (): Promise<void> => {
    return;
};