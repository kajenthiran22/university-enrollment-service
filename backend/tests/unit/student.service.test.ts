import { describe, it, expect, beforeEach, jest } from "@jest/globals";
import * as studentRepository from "../../src/repositories/student.repository";
import * as studentService from "../../src/services/student.service";

jest.mock("../../src/repositories/student.repository");

describe("Student Service Unit Tests", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("should create a student successfully", async () => {
        jest.spyOn(studentRepository, "findStudentByUserId")
            .mockResolvedValue(null);

        jest.spyOn(studentRepository, "createStudent")
            .mockResolvedValue({
                id: "student123",
                userId: "user123",
                registrationNumber: "ST001",
                name: "John Doe",
            } as any);

        const result = await studentService.createStudent(
            "user123",
            {
                registrationNumber: "ST001",
                name: "John Doe",
                dateOfBirth: new Date("2000-01-01"),
            },
        );

        expect(result.id)
            .toBe("student123");

        expect(studentRepository.createStudent)
            .toHaveBeenCalled();
    });

    it("should return all students", async () => {
        jest.spyOn(studentRepository, "getAllStudents")
            .mockResolvedValue([
                {
                    id: "student1",
                    name: "John",
                },
                {
                    id: "student2",
                    name: "David",
                },
            ] as any);

        const result = await studentService.getAllStudents();

        expect(result)
            .toHaveLength(2);

        expect(studentRepository.getAllStudents)
            .toHaveBeenCalled();
    });

    it("should return the requested student", async () => {
        jest.spyOn(studentRepository, "findStudentById")
            .mockResolvedValue({
                id: "student123",
                name: "John Doe",
            } as any);

        const result = await studentService.getStudentById(
            "student123",
        );

        expect(result?.id)
            .toBe("student123");
    });

    it("should update student successfully", async () => {
        jest.spyOn(studentRepository, "updateStudent")
            .mockResolvedValue({
                id: "student123",
                name: "Updated Name",
            } as any);

        const result = await studentService.updateStudent(
            "student123",
            {
                name: "Updated Name",
            },
        );

        expect(result?.name)
            .toBe("Updated Name");
    });

    it("should delete student successfully", async () => {
        jest.spyOn(studentRepository, "deleteStudent")
            .mockResolvedValue({
                id: "student123",
            } as any);

        await studentService.deleteStudent(
            "student123",
        );

        expect(studentRepository.deleteStudent)
            .toHaveBeenCalledWith(
                "student123",
            );
    });
});