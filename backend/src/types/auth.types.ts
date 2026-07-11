import type { User } from "./user.types";

export interface JwtPayload {
    userId: string;
    email: string;
}