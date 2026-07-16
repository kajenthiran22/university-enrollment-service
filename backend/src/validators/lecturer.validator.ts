import { z } from "zod";

export const updateLecturerSchema = z.object({
    body: z.object({
        employeeId: z.string().optional(),
        name: z.string().optional(),
        designation: z.string().optional(),
    }),

    params: z.object({
        id: z.string().min(1, "Lecturer id is required."),
    }),

    query: z.object({}),
});

export const lecturerIdSchema = z.object({
    body: z.object({}),

    params: z.object({
        id: z.string().min(1, "Lecturer id is required."),
    }),

    query: z.object({}),
});