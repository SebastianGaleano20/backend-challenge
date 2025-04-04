import { ErrorHandler } from "../types/middlewares";
import HTTP_STATUS from "../helpers/httpStatus";
import { Response } from "express";

export const ERROR_HANDLERS: ErrorHandler = {
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
