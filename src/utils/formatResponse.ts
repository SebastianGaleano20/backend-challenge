import { FormatResponse } from "../types/utils";

export const formatResponse = <T>(data: T, message: string): FormatResponse<T> => {
    return { data, message }
}