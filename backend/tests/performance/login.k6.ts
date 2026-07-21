import http from "k6/http";
import { check } from "k6";
import type { Options } from "k6/options";
import { BASE_URL } from "./helpers/config.ts";

export const options: Options = {
    vus: 20,
    duration: "30s",
    thresholds: {
        http_req_failed: ["rate<0.01"],
        http_req_duration: ["p(95)<1500"],
    },
};

export default function (): void {
    const payload = JSON.stringify({
        email: "student@example.com",
        password: "Password123",
    });

    const params = {
        headers: {
            "Content-Type": "application/json",
        },
    };

    const response = http.post(
        `${BASE_URL}/auth/login`,
        payload,
        params,
    );

    check(response, {
        "status is 200": (r) => r.status === 200,
        "has access token": (r) =>
            r.json("data.tokens.accessToken") !== undefined,
    });
}