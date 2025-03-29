import HTTP_STATUS from "../helpers/httpStatus";
const ERROR_HANDLERS = {
    sqlError: (res, error) => {
        res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: `Database error: ${error.message}`,
        });
    },
    genericError: (res, error) => {
        res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: `Internal Server Error: ${error.message}`,
        });
    },
    defaultError: (res, error) => {
        res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
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
export default errorHandler;
