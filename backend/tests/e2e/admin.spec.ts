import { test, expect } from "@playwright/test";
import { api } from "./helpers/api";
import { registerStudent, login } from "./helpers/auth";

test.describe("Admin E2E Tests", () => {
    let adminToken: string;
    let studentId: string;

    test.beforeAll(async () => {
        const student = await registerStudent();

        studentId = student.userId;

        const admin = await login(
            "admin@example.com",
            "Password123"
        );

        adminToken = admin.accessToken;
    });

    test("should view pending approvals", async () => {
        const response = await api.get(
            "/admin/pending",
            adminToken
        );

        expect(response.status()).toBe(200);
    });

    test("should approve student", async () => {
        const response = await api.patch(
            `/admin/${studentId}/approve`,
            {},
            adminToken
        );

        expect(response.status()).toBe(200);
    });

    test("should reject student", async () => {
        const response = await api.patch(
            `/admin/${studentId}/reject`,
            {},
            adminToken
        );

        expect(response.status()).toBe(200);
    });
});