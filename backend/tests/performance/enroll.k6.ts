import http from "k6/http";
import { check } from "k6";
import type { Options } from "k6/options";
import { BASE_URL } from "./helpers/config.ts";

interface LoginResponse {
    data: {
        tokens: {
            accessToken: string;
        };
    };
}

interface CourseResponse {
    data: {
        _id: string;
    };
}

interface SetupData {
    courseId: string;
    student1Token: string;
    student2Token: string;
}

const ADMIN_EMAIL = "admin@example.com";
const STUDENT_1_EMAIL = "student1@example.com";
const STUDENT_2_EMAIL = "student2@example.com";
const PASSWORD = "Password123";

export const options: Options = {
    scenarios: {
        student1: {
            executor: "constant-vus",
            exec: "student1Scenario",
            vus: 1,
            duration: "30s",
        },

        student2: {
            executor: "constant-vus",
            exec: "student2Scenario",
            vus: 1,
            duration: "30s",
        },
    },

    thresholds: {
        http_req_failed: ["rate<0.01"],
        http_req_duration: ["p(95)<700"],
    },
};

function login(email: string, password: string): string {
    const response = http.post(
        `${BASE_URL}/auth/login`,
        JSON.stringify({
            email,
            password,
        }),
        {
            headers: {
                "Content-Type": "application/json",
            },
        },
    );

    check(response, {
        "login success": (r) => r.status === 200,
    });

    const body = response.json() as unknown as LoginResponse;

    return body.data.tokens.accessToken;
}

function createCourse(adminToken: string): string {
    const response = http.post(
        `${BASE_URL}/course`,
        JSON.stringify({
            courseCode: `CS_${Date.now()}`,
            title: "Introduction to Computer Science",
            lecturerId: "6a58bb46422f672d476d30c9",
            credits: 3,
            capacity: 50,
        }),
        {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${adminToken}`,
            },
        },
    );

    check(response, {
        "course created": (r) => r.status === 201,
    });

    const body = response.json() as unknown as CourseResponse;

    return body.data._id;
}

export function setup(): SetupData {
    const adminToken = login(
        ADMIN_EMAIL,
        PASSWORD,
    );

    const courseId = createCourse(adminToken);

    const student1Token = login(
        STUDENT_1_EMAIL,
        PASSWORD,
    );

    const student2Token = login(
        STUDENT_2_EMAIL,
        PASSWORD,
    );

    console.log("courseId", courseId)
    console.log("student1Token", student1Token)
    console.log("student2Token", student2Token)
    
    return {
        courseId,
        student1Token,
        student2Token,
    };
}

function performEnrollment(courseId: string, token: string) {
    const headers = {
        Authorization: `Bearer ${token}`,
    };

    // Enroll
    const enrollResponse = http.post(
        `${BASE_URL}/course/${courseId}/enrollments`,
        null,
        {
            headers,
        },
    );

    console.log(`Enroll Status: ${enrollResponse.status} | ${enrollResponse.body}`);

    check(enrollResponse, {
        "student enrolled": (r) =>
            r.status === 201 || r.status === 409,
    });

    // Withdraw
    const withdrawResponse = http.del(
        `${BASE_URL}/course/${courseId}/enrollments`,
        null,
        {
            headers,
        },
    );

    console.log(`Withdraw Status: ${withdrawResponse.status} | ${withdrawResponse.body}`);

    check(withdrawResponse, {
        "student withdrawn": (r) =>
            r.status === 200 || r.status === 404,
    });
}

export function student1Scenario(data: SetupData) {
    performEnrollment(
        data.courseId,
        data.student1Token,
    );
}

export function student2Scenario(data: SetupData) {
    performEnrollment(
        data.courseId,
        data.student2Token,
    );
}