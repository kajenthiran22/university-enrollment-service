import type { HydratedDocument } from "mongoose";
import { USER_ROLE_VALUES, USER_STATUS_VALUES} from "../constants/auth.constants";

export interface User {
    email: string;
    password: string;
    role: typeof USER_ROLE_VALUES[number];
    status: typeof USER_STATUS_VALUES[number];
    createdAt: Date;
    updatedAt: Date;
}

export type UserDocument = HydratedDocument<User>;