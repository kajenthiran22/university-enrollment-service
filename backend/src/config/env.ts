import dotenv from "dotenv";
import { envSchema, type Config } from "./env.schema";

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

export const config: Readonly<Config> = Object.freeze(parsed.data);