import { describe, it, expect, beforeEach, jest } from "@jest/globals";
import * as lecturerRepository from "../../src/repositories/lecturer.repository";
import * as lecturerService from "../../src/services/lecturer.service";

jest.mock("../../src/repositories/lecturer.repository");

describe("Lecturer Service Unit Tests", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("should create a lecturer successfully", async () => {
        jest.spyOn(lecturerRepository, "findLecturerByUserId")
            .mockResolvedValue(null);

        jest.spyOn(lecturerRepository, "createLecturer")
            .mockResolvedValue({
                id: "lecturer123",
                userId: "user123",
                employeeId: "EMP001",
                name: "John Doe",
                designation: "Professor",
            } as any);

        const result = await lecturerService.createLecturer(
            "user123",
            {
                employeeId: "EMP001",
                name: "John Doe",
                designation: "Professor",
            },
        );

        expect(result.id)
            .toBe("lecturer123");

        expect(lecturerRepository.createLecturer)
            .toHaveBeenCalled();
    });

    it("should return all lecturers", async () => {
        jest.spyOn(lecturerRepository, "getAllLecturers")
            .mockResolvedValue([
                {
                    id: "lecturer1",
                    name: "John",
                },
                {
                    id: "lecturer2",
                    name: "David",
                },
            ] as any);

        const result = await lecturerService.getAllLecturers();

        expect(result)
            .toHaveLength(2);

        expect(lecturerRepository.getAllLecturers)
            .toHaveBeenCalled();
    });

    it("should return the requested lecturer", async () => {
        jest.spyOn(lecturerRepository, "findLecturerById")
            .mockResolvedValue({
                id: "lecturer123",
                name: "John Doe",
            } as any);

        const result = await lecturerService.getLecturerById(
            "lecturer123",
        );

        expect(result?.id)
            .toBe("lecturer123");
    });

    it("should update lecturer successfully", async () => {
        jest.spyOn(lecturerRepository, "updateLecturer")
            .mockResolvedValue({
                id: "lecturer123",
                name: "Updated Name",
            } as any);

        const result = await lecturerService.updateLecturer(
            "lecturer123",
            {
                name: "Updated Name",
            },
        );

        expect(result?.name)
            .toBe("Updated Name");
    });

    it("should delete lecturer successfully", async () => {
        jest.spyOn(lecturerRepository, "deleteLecturer")
            .mockResolvedValue({
                id: "lecturer123",
            } as any);

        await lecturerService.deleteLecturer(
            "lecturer123",
        );

        expect(lecturerRepository.deleteLecturer)
            .toHaveBeenCalledWith(
                "lecturer123",
            );
    });
});