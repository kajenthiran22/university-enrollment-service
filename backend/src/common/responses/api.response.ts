import type { HttpStatus } from "../../types/http.status.types"

export class ApiResponse<T> {
    public readonly success: boolean;
    public readonly httpStatus: HttpStatus;
    public readonly message: string;
    public readonly data?: T | undefined;

    constructor(
        httpStatus: HttpStatus,
        message: string,
        data?: T,
    ) {
        this.success = true;
        this.httpStatus = httpStatus;
        this.message = message;
        this.data = data;
    }
}