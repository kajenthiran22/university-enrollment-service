import { z } from "zod";

export const updateStudentSchema = z.object({
    body: z.object({
        registrationNumber: z.string().optional(),
        name: z.string().optional(),
        dateOfBirth: z.coerce.date("Invalid date of birth.").optional(),
    }),

    params: z.object({
        id: z.string().min(1, "Student id is required."),
    }),

    query: z.object({}),
});

export const studentIdSchema = z.object({
    body: z.object({}),

    params: z.object({
        id: z.string().min(1, "Student id is required."),
    }),

    query: z.object({}),
});