import type { ErrorCode } from "../../types/error.codes.types";
import type { HttpStatus } from "../../types/http.status.types"

export class AppError extends Error {
    public readonly httpStatus: HttpStatus;
    public readonly code: ErrorCode;

    constructor(
        code: ErrorCode,
        message: string,
        httpStatus: HttpStatus,
    ) {
        super(message);

        this.name = "AppError";
        this.code = code;
        this.httpStatus = httpStatus;

        Error.captureStackTrace(
            this,
            this.constructor,
        );
    }
}