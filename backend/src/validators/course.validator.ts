import { z } from "zod";

export const createCourseSchema = z.object({
    body: z.object({
        courseCode: z.string().min(1, "Course code is required."),
        title: z.string().min(1, "Course title is required."),
        credits: z.number().min(1, "Credits are required."),
        lecturerId: z.string().min(1, "Lecturer id is required."),
        capacity: z.number().min(1, "Capacity is required."),
    }),

    params: z.object({}),

    query: z.object({}),
});

export const updateCourseSchema = z.object({
    body: z.object({
        title: z.string().optional(),
        credits: z.number().optional(),
        capacity: z.number().optional(),
        enrollmentOpen: z.boolean().optional(),
        enrolledCount: z.number().optional(),
    }),

    params: z.object({
        // id: z.string().min(1, "Course id is required."),
    }),

    query: z.object({}),
});

export const courseIdSchema = z.object({
    // body: z.object({}),

    params: z.object({
        // id: z.string().min(1, "Course id is required."),
    }),

    query: z.object({}),
});