import dotenv from "dotenv";
import { envSchema, type EnvConfig } from "./env.schema";

const result = dotenv.config();

if (result.error && (result.error as NodeJS.ErrnoException).code !== "ENOENT") {
  throw result.error;
}

const parsed = envSchema.safeParse(process.env);

if (!parsed.success) {
  throw new Error(
    `Invalid environment configuration: ${parsed.error.message}`
  );
}

export const env: Readonly<EnvConfig> = Object.freeze(parsed.data);