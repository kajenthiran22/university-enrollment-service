import { describe, it, expect, beforeEach, jest } from "@jest/globals";
import * as courseRepository from "../../src/repositories/course.repository";
import * as lecturerRepository from "../../src/repositories/lecturer.repository";
import * as courseService from "../../src/services/course.service";

jest.mock("../../src/repositories/course.repository");
jest.mock("../../src/repositories/lecturer.repository");

describe("Course Service Unit Tests", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });
    
    it("should create a course successfully", async () => {
        jest.spyOn(lecturerRepository, "findLecturerById")
            .mockResolvedValue({
                id: "lecturer123",
            } as any);

        jest.spyOn(courseRepository, "findCourseByCode")
            .mockResolvedValue(null);

        jest.spyOn(courseRepository, "createCourse")
            .mockResolvedValue({
                id: "course123",
                courseCode: "CS101",
                title: "Programming",
            } as any);

        const result = await courseService.createCourse({
            courseCode: "CS101",
            title: "Programming",
            credits: 3,
            lecturerId: "lecturer123",
            capacity: 50,
        });

        expect(result.id)
            .toBe("course123");

        expect(courseRepository.createCourse)
            .toHaveBeenCalled();
    });

    it("should return all courses", async () => {
        jest.spyOn(courseRepository, "getAllCourses")
            .mockResolvedValue([
                {
                    id: "course1",
                },
                {
                    id: "course2",
                },
            ] as any);

        const result = await courseService.getAllCourses();

        expect(result)
            .toHaveLength(2);
    });

    it("should return the requested course", async () => {
        jest.spyOn(courseRepository, "findCourseById")
            .mockResolvedValue({
                id: "course123",
            } as any);

        const result = await courseService.getCourseById(
            "course123",
        );

        expect(result?.id)
            .toBe("course123");
    });

    it("should return lecturer courses", async () => {
        jest.spyOn(courseRepository, "getCoursesByLecturer")
            .mockResolvedValue([
                {
                    id: "course123",
                },
            ] as any);

        const result = await courseService.getCoursesByLecturer(
            "lecturer123",
        );

        expect(result)
            .toHaveLength(1);
    });

    it("should update course successfully", async () => {
        jest.spyOn(courseRepository, "updateCourse")
            .mockResolvedValue({
                id: "course123",
                title: "Updated Course",
            } as any);

        const result = await courseRepository.updateCourse(
            "course123",
            {
                title: "Updated Course",
            },
        );

        expect(result?.title)
            .toBe("Updated Course");
    });

    it("should delete course successfully", async () => {
        jest.spyOn(courseRepository, "deleteCourse")
            .mockResolvedValue({
                id: "course123",
            } as any);

        await courseService.deleteCourse(
            "course123",
        );

        expect(courseRepository.deleteCourse)
            .toHaveBeenCalledWith(
                "course123",
            );
    });
});