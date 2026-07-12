import type { User } from "./user.types";

export interface JwtPayload {
    userId: string;
    email: string;
    role: User["role"];
}

export interface RegisterRequest {
    email: string;
    password: string;
    confirmPassword: string;
}

export interface LoginRequest {
    email: string;
    password: string;
}

export interface AuthTokens {
    accessToken: string;
    refreshToken: string;
}

export interface AuthUser {
    id: string;
    email: string;
    role: User["role"];
}

export interface AuthResponse {
    user: AuthUser;
    tokens: AuthTokens;
}