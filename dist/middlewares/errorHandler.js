"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const httpStatus_1 = __importDefault(require("../helpers/httpStatus"));
const ERROR_HANDLERS = {
    sqlError: (res, error) => {
        res.status(httpStatus_1.default.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: `Database error: ${error.message}`,
        });
    },
    genericError: (res, error) => {
        res.status(httpStatus_1.default.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: `Internal Server Error: ${error.message}`,
        });
    },
    defaultError: (res, error) => {
        res.status(httpStatus_1.default.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: error.message,
        });
    },
};
const errorHandler = (error, _req, res, _next) => {
    console.error("Error handler:", error);
    const handler = ERROR_HANDLERS[error.name] || ERROR_HANDLERS.defaultError;
    handler(res, error);
};
exports.default = errorHandler;
