import { ERROR_CODES } from "../constants/error.codes.constants";

export type ErrorCode =
    typeof ERROR_CODES[keyof typeof ERROR_CODES];