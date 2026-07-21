import { test, expect } from "@playwright/test";
import { api } from "./helpers/api";
import { createApprovedStudent, login } from "./helpers/auth";

test.describe("Course E2E Tests", () => {
    let adminToken: string;
    let courseId: string;
    let lecturerId: string;

    test.beforeAll(async () => {
        const lecturer = await createApprovedStudent();

        lecturerId = lecturer.id;

        const admin = await login(
            "admin@example.com",
            "Password123"
        );

        adminToken = admin.accessToken;
    });

    test("should create course", async () => {
        const response = await api.post(
            "/course",
            {
                "courseCode": `CS_${Date.now()}`,
                "title": "Introduction to Computer Science",
                "credits": 3,
                "lecturerId": lecturerId,
                "capacity": 50
            },
            adminToken
        );

        expect(response.status()).toBe(201);

        const body = await response.json();

        courseId = body.data._id;
    });

    test("should get course", async () => {
        const response = await api.get(
            `/course/${courseId}`,
            adminToken
        );

        expect(response.status()).toBe(200);
    });

    test("should update course", async () => {
        const response = await api.put(
            `/course/${courseId}`,
            {
                title: "Advanced Computer Science"
            },
            adminToken
        );

        expect(response.status()).toBe(200);
    });

    test("should get courses by lecturer", async () => {
        const response = await api.get(
            `/course/lecturer/${lecturerId}`,
            adminToken
        );

        expect(response.status()).toBe(200);
    });
});