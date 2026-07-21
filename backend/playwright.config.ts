import { defineConfig } from "@playwright/test";

export default defineConfig({
    testDir: "./tests/e2e",
    timeout: 30000,
    expect: {
        timeout: 5000,
    },

    workers: 1,
    fullyParallel: false,

    use: {
        extraHTTPHeaders: {
            "Content-Type": "application/json",
        },
    },
    reporter: [
        ["list"],
        ["html"],
    ],
});