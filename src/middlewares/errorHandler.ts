import { ERROR_HANDLERS } from "../utils/errorHandlerObject.js";
import { Response, Request, NextFunction } from "express";

const errorHandler = (
  error: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  console.error("Error handler:", error);

  const handler = ERROR_HANDLERS[error.name] || ERROR_HANDLERS.defaultError;

  handler(res, error);
};

export default errorHandler;
