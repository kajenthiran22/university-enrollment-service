import * as authRepository from "../repositories/auth.repository";
import { comparePassword, hashPassword } from "../utils/password.util";
import { generateAccessToken, generateRefreshToken } from "../utils/jwt.util";
import type { AuthResponse, JwtPayload, RegisterRequest, LoginRequest } from "../types/auth.types";
import { AppError } from "../common/errors/app.error";
import { ERROR_CODES } from "../constants/error.codes.constants";
import { HTTP_STATUS } from "../constants/http.constants";

export const register = async (data: RegisterRequest): Promise<AuthResponse> => {
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