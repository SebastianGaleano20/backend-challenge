import { FormatResponse } from "../types/utils/index.js";

export const formatResponse = <T>(
  data: T,
  message: string
): FormatResponse<T> => {
  return { data, message };
};
