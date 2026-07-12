import { createUser, userExistsByEmail, findUserByEmail } from "../repositories/user.repository";
import { comparePassword, hashPassword } from "../utils/password.util";
import { generateAccessToken, generateRefreshToken } from "../utils/jwt.util";
import type { AuthResponse, JwtPayload, RegisterRequest, LoginRequest } from "../types/auth.types";

export const register = async (data: RegisterRequest): Promise<AuthResponse> => {
    const emailExists = await userExistsByEmail(data.email);

    if (emailExists) {
        throw new Error("Email already exists.");
    }

    const hashedPassword = await hashPassword(
        data.password
    );

    const user = await createUser({
        email: data.email,
        password: hashedPassword,
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
        throw new Error("Invalid email or password.");
    }

    const passwordMatches = await comparePassword(
        data.password,
        user.password,
    );

    if (!passwordMatches) {
        throw new Error("Invalid email or password.");
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