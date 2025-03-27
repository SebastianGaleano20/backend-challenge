import { FormatResponse } from "../types/utils";

export const formatResponse = <T>(data: T, message: string, status: number): FormatResponse<T> => {
    return { data, message, status }
}