import { test, expect } from "@playwright/test";
import { api } from "./helpers/api";

test.describe("Authentication E2E Tests", () => {
    const student = {
        email: `student_${Date.now()}@example.com`,
        password: "Password@123",
        confirmPassword: "Password@123",
        registrationNumber: `ST-${Date.now()}`,
        name: "Test Student",
        dateOfBirth: "2000-01-01",
    };

    const lecturer = {
        email: `lecturer_${Date.now()}@example.com`,
        password: "Password@123",
        confirmPassword: "Password@123",
        employeeId: `EMP-${Date.now()}`,
        name: "Test Lecturer",
        designation: "Professor",
    };

    test("should register student successfully", async () => {

        const response = await api.post(
            "/auth/register/student",
            student,
        );
        expect(response.status()).toBe(201);

        const body = await response.json();

        expect(body.success).toBe(true);
        expect(body.message)
            .toBe("Student registered successfully.");
    });

    test("should register lecturer successfully", async () => {

        const response = await api.post(
            "/auth/register/lecturer",
            lecturer,
        );

        expect(response.status()).toBe(201);

        const body = await response.json();

        expect(body.success).toBe(true);
        expect(body.message)
            .toBe("Lecturer registered successfully.");
    });

    test("should reject login for pending account", async () => {

        const response = await api.post(
            "/auth/login",
            {
                email: student.email,
                password: student.password,
            },
        );

        expect(response.status()).toBe(403);

        const body = await response.json();

        expect(body.error.message)
            .toContain("awaiting administrator approval");
    });

    test("should reject invalid credentials", async () => {

        const response = await api.post(
            "/auth/login",
            {
                email: "invalid@example.com",
                password: "wrong-password",
            },
        );

        expect(response.status()).toBe(401);
    });
});