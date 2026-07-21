import { test, expect } from "@playwright/test";
import { api } from "./helpers/api";
import { createApprovedLecturer, login } from "./helpers/auth";

test.describe("Lecturer E2E Tests", () => {
    let token: string;
    let lecturerId: string;
    let adminToken: string;

    test.beforeAll(async () => {
        const lecturer = await createApprovedLecturer();

        token = lecturer.token;
        lecturerId = lecturer.id;

        const admin = await login(
            "admin@example.com",
            "Password123"
        );

        adminToken = admin.accessToken;
    });

    test("should view own profile", async () => {
        const response = await api.get(
            `/lecturer/${lecturerId}`,
            token
        );

        expect(response.status()).toBe(200);
    });

    test("should update lecturer profile by admin", async () => {
        const response = await api.put(
            `/lecturer/${lecturerId}`,
            {
                designation: "Senior Lecturer"
            },
            adminToken
        );

        expect(response.status()).toBe(200);
    });
});