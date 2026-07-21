import { test, expect } from "@playwright/test";
import { api } from "./helpers/api";
import { createApprovedStudent, login } from "./helpers/auth";

test.describe("Student E2E Tests", () => {
    let token: string;
    let studentId: string;
    let adminToken: string;

    test.beforeAll(async () => {
        const student = await createApprovedStudent();

        token = student.token;
        studentId = student.id;

        const admin = await login(
            "admin@example.com",
            "Password123"
        );

        adminToken = admin.accessToken;
    });

    test("should view own profile", async () => {
        const response = await api.get(
            `/student/${studentId}`,
            token
        );

        expect(response.status()).toBe(200);
    });

    test("should update student profile by admin", async () => {
        const response = await api.put(
            `/student/${studentId}`,
            {
                name: "Updated Student"
            },
            adminToken
        );

        expect(response.status()).toBe(200);
    });
});