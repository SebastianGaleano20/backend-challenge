import { ErrorHandler } from "@/types/middlewares";
import HTTP_STATUS from "../helpers/httpStatus";
import { Response, Request, NextFunction } from "express";

const ERROR_HANDLERS: ErrorHandler = {
  sqlError: (res: Response, error: Error) => {
    res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: `Database error: ${error.message}`,
    });
  },
  genericError: (res: Response, error: Error) => {
    res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: `Internal Server Error: ${error.message}`,
    });
  },
  defaultError: (res: Response, error: Error) => {
    res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: error.message,
    });
  },
};

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
