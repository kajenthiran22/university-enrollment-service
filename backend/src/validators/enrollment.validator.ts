import { z } from "zod";

export const enrollmentIdSchema = z.object({
    body: z.object({
        status: z.string().optional(),
    }),

    params: z.object({
        // id: z.string().min(1, "Enrollment id is required."),
    }),

    query: z.object({}),
});