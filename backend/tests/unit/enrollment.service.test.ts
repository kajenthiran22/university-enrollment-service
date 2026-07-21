import { describe, it, expect, beforeEach, jest } from "@jest/globals";
import mongoose from "mongoose";

import * as enrollmentRepository from "../../src/repositories/enrollment.repository";
import * as enrollmentService from "../../src/services/enrollment.service";
import * as studentRepository from "../../src/repositories/student.repository";
import * as courseRepository from "../../src/repositories/course.repository";

jest.mock("../../src/repositories/enrollment.repository");
jest.mock("../../src/repositories/student.repository");
jest.mock("../../src/repositories/course.repository");

describe("Enrollment Service Unit Tests", () => {
    beforeEach(() => {
        jest.clearAllMocks();

        jest.spyOn(mongoose, "startSession")
            .mockResolvedValue({
                startTransaction: jest.fn(),
                commitTransaction: jest.fn(),
                abortTransaction: jest.fn(),
                endSession: jest.fn(),
            } as any);
    });

    it("should enroll student successfully", async () => {
        jest.spyOn(studentRepository, "findStudentByUserId")
            .mockResolvedValue({
                id: "student123",
            } as any);

        jest.spyOn(courseRepository, "findCourseById")
            .mockResolvedValue({
                id: "course123",
                enrollmentOpen: true,
                enrolledCount: 0,
                capacity: 50,
            } as any);

        jest.spyOn(enrollmentRepository, "findEnrollment")
            .mockResolvedValue(null);

        jest.spyOn(enrollmentRepository, "createEnrollment")
            .mockResolvedValue({
                id: "enrollment123",
                studentId: "student123",
                courseId: "course123",
                status: "active",
                enrolledAt: new Date(),
            } as any);

        jest.spyOn(courseRepository, "updateCourse")
            .mockResolvedValue({
                id: "course123",
            } as any);

        const result = await enrollmentService.enrollStudent(
            "user123",
            "course123",
        );

        expect(result?.id)
            .toBe("enrollment123");

        expect(result?.status)
            .toBe("active");

        expect(enrollmentRepository.createEnrollment)
            .toHaveBeenCalled();
    });

    it("should withdraw student successfully", async () => {
        jest.spyOn(studentRepository, "findStudentByUserId")
            .mockResolvedValue({
                id: "student123",
            } as any);

        jest.spyOn(enrollmentRepository, "findEnrollment")
            .mockResolvedValue({
                id: "enrollment123",
                studentId: "student123",
                courseId: "course123",
                status: "active",
            } as any);

        jest.spyOn(enrollmentRepository, "withdrawEnrollment")
            .mockResolvedValue({
                id: "enrollment123",
                studentId: "student123",
                courseId: "course123",
                status: "withdrawn",
                withdrawnAt: new Date(),
            } as any);

        jest.spyOn(courseRepository, "updateCourse")
            .mockResolvedValue({
                id: "course123",
            } as any);

        const result = await enrollmentService.withdrawStudent(
            "user123",
            "course123",
        );

        expect(result?.id)
            .toBe("enrollment123");

        expect(result?.status)
            .toBe("withdrawn");

        expect(enrollmentRepository.withdrawEnrollment)
            .toHaveBeenCalled();
    });

    it("should return all enrollments", async () => {
        jest.spyOn(enrollmentRepository, "getAllEnrollments")
            .mockResolvedValue([
                {
                    id: "enrollment1",
                },
                {
                    id: "enrollment2",
                },
            ] as any);

        const result =
            await enrollmentService.getAllEnrollments();


        expect(result)
            .toHaveLength(2);

    });

    it("should return enrollment by id", async () => {

        jest.spyOn(enrollmentRepository, "findEnrollmentById")
            .mockResolvedValue({
                id: "enrollment123",
            } as any);

        const result =
            await enrollmentService.getEnrollmentById(
                "enrollment123",
            );

        expect(result?.id)
            .toBe("enrollment123");

    });

    it("should delete enrollment successfully", async () => {
        jest.spyOn(enrollmentRepository, "deleteEnrollment")
            .mockResolvedValue({
                id: "enrollment123",
            } as any);

        await enrollmentService.deleteEnrollment(
            "enrollment123",
        );

        expect(enrollmentRepository.deleteEnrollment)
            .toHaveBeenCalledWith(
                "enrollment123",
            );

    });
});