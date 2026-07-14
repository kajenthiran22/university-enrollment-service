import type { ErrorCode } from "./error.codes";

export class AppError extends Error {
    public readonly statusCode: number;
    public readonly code: ErrorCode;

    constructor(
        code: ErrorCode,
        message: string,
        statusCode: number,
    ) {
        super(message);

        this.name = "AppError";
        this.code = code;
        this.statusCode = statusCode;

        Error.captureStackTrace(
            this,
            this.constructor,
        );
    }
}