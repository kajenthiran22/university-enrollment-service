import { HTTP_STATUS } from "../constants/http.constants";

export type HttpStatus = 
    typeof HTTP_STATUS[keyof typeof HTTP_STATUS];