import { describe, it, expect, beforeEach, jest } from "@jest/globals";
import * as authRepository from "../../src/repositories/auth.repository";
import * as studentRepository from "../../src/repositories/student.repository";
import * as lecturerRepository from "../../src/repositories/lecturer.repository";
import * as passwordUtil from "../../src/utils/password.util";
import * as jwtUtil from "../../src/utils/jwt.util";
import * as authService from "../../src/services/auth.service";
import { AppError } from "../../src/common/errors/app.error";
import { USER_STATUS } from "../../src/constants/auth.constants";

jest.mock("../../src/repositories/auth.repository");
jest.mock("../../src/repositories/student.repository");
jest.mock("../../src/repositories/lecturer.repository");
jest.mock("../../src/utils/password.util");
jest.mock("../../src/utils/jwt.util");

describe("Auth Service Unit Tests", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe("Register User", () => {
        it("should register student successfully", async () => {
            jest.spyOn(authRepository, "userExistsByEmail")
                .mockResolvedValue(false);

            jest.spyOn(passwordUtil, "hashPassword")
                .mockResolvedValue("hashed-password");

            jest.spyOn(authRepository, "createUser")
                .mockResolvedValue({
                    id: "user123",
                    email: "student@example.com",
                    role: "STUDENT",
                } as any);

            jest.spyOn(jwtUtil, "generateAccessToken")
                .mockReturnValue("access-token");

            jest.spyOn(jwtUtil, "generateRefreshToken")
                .mockReturnValue("refresh-token");

            const result = await authService.studentRegister({
                email: "student@example.com",
                password: "Password123",
                confirmPassword: "Password123",
                registrationNumber: "ST001",
                name: "John Doe",
                dateOfBirth: new Date("2000-01-01"),
            });

            expect(authRepository.createUser)
                .toHaveBeenCalled();

            expect(studentRepository.createStudent)
                .toHaveBeenCalled();
        });

        it("should register lecturer successfully", async () => {
            jest.spyOn(authRepository, "userExistsByEmail")
                .mockResolvedValue(false);

            jest.spyOn(passwordUtil, "hashPassword")
                .mockResolvedValue("hashed-password");

            jest.spyOn(authRepository, "createUser")
                .mockResolvedValue({
                    id: "user123",
                    email: "student@example.com",
                    role: "STUDENT",
                } as any);

            jest.spyOn(jwtUtil, "generateAccessToken")
                .mockReturnValue("access-token");

            jest.spyOn(jwtUtil, "generateRefreshToken")
                .mockReturnValue("refresh-token");

            const result = await authService.lecturerRegister({
                email: "student@example.com",
                password: "Password123",
                confirmPassword: "Password123",
                employeeId: "ST001",
                name: "John Doe",
                designation: "Senior Lecturer",
            });

            expect(authRepository.createUser)
                .toHaveBeenCalled();

            expect(lecturerRepository.createLecturer)
                .toHaveBeenCalled();
        });

        it("should throw error if email already exists", async () => {
            jest.spyOn(authRepository, "userExistsByEmail")
                .mockResolvedValue(true);

            await expect(
                authService.studentRegister({
                    email: "student@example.com",
                    password: "Password123",
                    confirmPassword: "Password123",
                    registrationNumber: "ST001",
                    name: "John Doe",
                    dateOfBirth: new Date("2000-01-01"),
                })
            )
                .rejects
                .toBeInstanceOf(AppError);
        });
    });

    describe("Login User", () => {
        it("should login user successfully", async () => {
            jest.spyOn(authRepository, "findUserByEmail")
                .mockResolvedValue({
                    id: "user123",
                    email: "student@example.com",
                    password: "hashed-password",
                    role: "STUDENT",
                    status: USER_STATUS.APPROVED,
                } as any);

            jest.spyOn(passwordUtil, "comparePassword")
                .mockResolvedValue(true);

            jest.spyOn(jwtUtil, "generateAccessToken")
                .mockReturnValue("access-token");

            jest.spyOn(jwtUtil, "generateRefreshToken")
                .mockReturnValue("refresh-token");

            const result = await authService.login({
                email: "student@example.com",
                password: "Password123",
            });

            expect(result.tokens.accessToken)
                .toBe("access-token");
        });

        it("should reject invalid password", async () => {
            jest.spyOn(authRepository, "findUserByEmail")
                .mockResolvedValue({
                    id: "user123",
                    email: "student@example.com",
                    password: "hashed-password",
                    role: "STUDENT",
                    status: USER_STATUS.APPROVED,
                } as any);

            jest.spyOn(passwordUtil, "comparePassword")
                .mockResolvedValue(false);

            await expect(
                authService.login({
                    email: "student@example.com",
                    password: "wrong-password",
                }),
            )
                .rejects
                .toBeInstanceOf(AppError);
        });

        it("should reject user not found", async () => {
            jest.spyOn(authRepository, "findUserByEmail")
                .mockResolvedValue(null);

            await expect(
                authService.login({
                    email: "unknown@example.com",
                    password: "Password123",
                }),
            )
                .rejects
                .toBeInstanceOf(AppError);
        });

        it("should reject pending account", async () => {
            jest.spyOn(authRepository, "findUserByEmail")
                .mockResolvedValue({
                    id: "user123",
                    email: "student@example.com",
                    password: "hashed-password",
                    role: "STUDENT",
                    status: USER_STATUS.PENDING,
                } as any);

            jest.spyOn(passwordUtil, "comparePassword")
                .mockResolvedValue(true);

            await expect(
                authService.login({
                    email: "student@example.com",
                    password: "Password123",
                }),
            ).rejects.toBeInstanceOf(AppError);
        });
    });
});