import { test, expect } from "@playwright/test";
import { api } from "./helpers/api";
import { createApprovedStudent, createApprovedLecturer, login } from "./helpers/auth";

test.describe("Enrollment E2E Tests", () => {
    let studentToken: string;
    let lecturerToken: string;
    let courseId: string;
    let enrollmentId: string;
    let lecturerId: string;
    let studentId: string;

    test.beforeAll(async () => {
        const student = await createApprovedStudent();
        studentToken = student.token;
        studentId = student.id;

        const lecturer = await createApprovedLecturer();
        lecturerToken = lecturer.token;
        lecturerId = lecturer.id;

        const admin = await login(
            "admin@example.com",
            "Password123"
        );

        const course = await api.post(
            "/course",
            {
                "courseCode": `CS_${Date.now()}`,
                "title": "Introduction to Computer Science",
                "credits": 3,
                "lecturerId": lecturerId,
                "capacity": 50
            },
            admin.accessToken
        );

        const body = await course.json();

        courseId = body.data._id;
    });

    test("should enroll in course", async () => {
        const response = await api.post(
            `/course/${courseId}/enrollments`,
            {},
            studentToken
        );

        expect(response.status()).toBe(201);

        const body = await response.json();

        enrollmentId = body.data._id;
    });

    test("should prevent duplicate enrollment", async () => {
        const response = await api.post(
            `/course/${courseId}/enrollments`,
            {},
            studentToken
        );

        expect(response.status()).toBe(409);
    });

    test("should withdraw course", async () => {
        const response = await api.delete(
            `/course/${courseId}/enrollments`,
            studentToken
        );

        expect(response.status()).toBe(200);
    });

    test("should get my enrollments", async () => {
        const response = await api.get(
            `/student/${studentId}/enrollments`,
            studentToken
        );

        expect(response.status()).toBe(200);
    });

    test("should get course enrollments by lecturer", async () => {
        const response = await api.get(
            `/course/${courseId}/students`,
            lecturerToken
        );

        expect(response.status()).toBe(200);
    });

    test("should get enrollment by id", async () => {
        const response = await api.get(
            `/enrollment/${enrollmentId}`,
            lecturerToken
        );

        expect(response.status()).toBe(200);
    });
});