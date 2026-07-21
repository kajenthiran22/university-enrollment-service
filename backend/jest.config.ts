import type { Config } from "jest";

const config: Config = {
    preset: "ts-jest",
    testEnvironment: "node",
    testMatch: [
        "**/tests/unit/**/*.test.ts",
    ],
    clearMocks: true,
    coverageDirectory: "coverage",
    collectCoverageFrom: [
        "src/**/*.ts",
        "!src/server.ts",
        "!src/app.ts",
    ],
};

export default config;