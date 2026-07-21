import { api } from "./api";

const randomId = () => Date.now();

export async function registerStudent() {
    const email = `student${randomId()}@example.com`;

    const response = await api.post(
        "/auth/register/student",
        {
            email,
            password: "Password123",
            confirmPassword: "Password123",
            registrationNumber: `ST${randomId()}`,
            name: "Test Student",
            dateOfBirth: "2000-01-01",
        }
    );

    const body = await response.json();

    return {
        email,
        userId: body.data?._id,
    };
}

export async function registerLecturer() {
    const email = `lecturer${randomId()}@example.com`;

    const response = await api.post(
        "/auth/register/lecturer",
        {
            email,
            password: "Password123",
            confirmPassword: "Password123",
            employeeId: `EMP${randomId()}`,
            name: "Test Lecturer",
            designation: "Lecturer",
        }
    );

    const body = await response.json();

    return {
        email,
        userId: body.data?._id,
    };
}

export async function login(email: string, password: string) {
    const response = await api.post(
        "/auth/login",
        {
            email,
            password,
        }
    );

    const body = await response.json();

    return {
        accessToken: body.data.tokens.accessToken,
        refreshToken: body.data.tokens.refreshToken,
        user: body.data.user,
    };
}

export async function createApprovedStudent() {
    const student = await registerStudent();

    const admin = await login(
        "admin@example.com",
        "Password123"
    );

    await api.patch(
        `/admin/${student.userId}/approve`,
        {},
        admin.accessToken
    );

    const loginResponse = await login(
        student.email,
        "Password123"
    );

    return {
        id: student.userId,
        token: loginResponse.accessToken,
    };
}

export async function createApprovedLecturer() {
    const lecturer = await registerLecturer();

    const admin = await login(
        "admin@example.com",
        "Password123"
    );

    const abc = await api.patch(
        `/admin/${lecturer.userId}/approve`,
        {},
        admin.accessToken
    );

    const loginResponse = await login(
        lecturer.email,
        "Password123"
    );

    return {
        id: lecturer.userId,
        token: loginResponse.accessToken,
    };
}