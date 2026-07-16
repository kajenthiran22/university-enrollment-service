import type { User } from "./user.types";

export interface JwtPayload {
    userId: string;
    email: string;
    role: User["role"];
}

export interface StudentRegisterRequest {
    email: string;
    password: string;
    confirmPassword: string;

    registrationNumber: string;
    name: string;
    dateOfBirth: Date;
}

export interface LecturerRegisterRequest {
    email: string;
    password: string;
    confirmPassword: string;

    employeeId: string;
    name: string;
    designation: string;
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