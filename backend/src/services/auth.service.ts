import { createUser, userExistsByEmail, findUserByEmail } from "../repositories/user.repository";
import { comparePassword, hashPassword } from "../utils/password.util";
import { generateAccessToken, generateRefreshToken } from "../utils/jwt.util";
import type { AuthResponse, JwtPayload, RegisterRequest, LoginRequest } from "../types/auth.types";
import { findUserById } from "../repositories/user.repository";
import { AppError } from "../common/errors/app.error";
import { ERROR_CODES } from "../constants/error.codes.constants";
import { HTTP_STATUS } from "../constants/http.constants";

export const register = async (data: RegisterRequest): Promise<AuthResponse> => {
    const emailExists = await userExistsByEmail(data.email);

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

    const user = await createUser({
        email: data.email,
        password: hashedPassword,
        role: data.role
    });

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

export const login = async (data: LoginRequest): Promise<AuthResponse> => {
    const user = await findUserByEmail(data.email);

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

export const getCurrentUser = async (payload: JwtPayload): Promise<AuthResponse> => {
    const user = await findUserById(payload.userId);

    if (!user) {
        throw new AppError(
            ERROR_CODES.USER_NOT_FOUND,
            "User not found.",
            HTTP_STATUS.NOT_FOUND,
        );
    }

    return {
        user: {
            id: user.id,
            email: user.email,
            role: user.role,
        },
        tokens: {
            accessToken: "",
            refreshToken: "",
        },
    };
};