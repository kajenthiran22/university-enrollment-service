import jwt from "jsonwebtoken";
import { env } from "../config";
import { JWT } from "../constants/auth.constants";
import type { JwtPayload } from "../types/auth.types";
import type { StringValue } from "ms";

const signToken = (payload: JwtPayload, expiresIn: number | StringValue): string => {
    return jwt.sign(
        payload,
        env.JWT_SECRET,
        {
            expiresIn,
            algorithm: "HS256",
        }
    );
};

export const generateAccessToken = (payload: JwtPayload): string => {
    return signToken(
        payload,
        JWT.ACCESS_TOKEN_EXPIRES_IN
    );
};

export const generateRefreshToken = (payload: JwtPayload): string => {
    return signToken(
        payload,
        JWT.REFRESH_TOKEN_EXPIRES_IN
    );
};

export const verifyToken = (token: string): JwtPayload => {
    return jwt.verify(
        token,
        env.JWT_SECRET,
        {
            algorithms: ["HS256"],
        }
    ) as JwtPayload;
};