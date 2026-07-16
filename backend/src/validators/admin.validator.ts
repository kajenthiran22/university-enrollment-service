import { z } from "zod";

export const userIdSchema = z.object({
    body: z.object({}),

    params: z.object({
        id: z.string().min(1, "User id is required."),
    }),

    query: z.object({}),
});