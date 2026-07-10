import { z } from "zod";
import { NODE_ENV_VALUES, NODE_ENVS, LOG_LEVEL_VALUES, LOG_LEVELS } from "../constants/env.constants";

export const envSchema = z.object({
    PORT: z.coerce
        .number()
        .int()
        .positive()
        .default(3000),

    NODE_ENV: z
        .enum(NODE_ENV_VALUES)
        .default(NODE_ENVS.DEVELOPMENT),

    LOG_LEVEL: z
        .enum(LOG_LEVEL_VALUES)
        .default(LOG_LEVELS.INFO),

    MONGODB_URI: z
        .string()
        .trim()
        .regex(/^mongodb(\+srv)?:\/\//, { message: "Invalid MongoDB connection string" }),

    JWT_SECRET: z
        .string()
        .trim()
        .min(32, { message: "JWT_SECRET must be at least 32 characters long" }),
});

export type Config = z.infer<typeof envSchema>;