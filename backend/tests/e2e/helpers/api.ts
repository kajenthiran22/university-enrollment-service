import { request } from "@playwright/test";

const BASE_URL = "http://localhost:3000/api/v1";

export const api = {
    async get(url: string, token?: string) {
        const context = await request.newContext();

        return context.get(`${BASE_URL}${url}`, {
            headers: token ? {
                Authorization: `Bearer ${token}`,
            } : undefined,
        });
    },

    async post(url: string, data: any = {}, token?: string) {
        const context = await request.newContext();

        return context.post(`${BASE_URL}${url}`, {
            data: data,
            headers: token ? {
                Authorization: `Bearer ${token}`,
            } : undefined,
        });
    },

    async put(url: string, data: any = {}, token?: string) {
        const context = await request.newContext();

        return context.put(`${BASE_URL}${url}`, {
            data: data,
            headers: token ? {
                Authorization: `Bearer ${token}`,
            } : undefined,
        });
    },

    async patch(url: string, data: any = {}, token?: string) {
        const context = await request.newContext();

        return context.patch(`${BASE_URL}${url}`, {
            data: data,
            headers: token ? {
                Authorization: `Bearer ${token}`,
            } : undefined,
        });
    },

    async delete(url: string, token?: string) {
        const context = await request.newContext();

        return context.delete(`${BASE_URL}${url}`, {
            headers: token ? {
                Authorization: `Bearer ${token}`,
            } : undefined,
        });
    },
};