import HTTP_STATUS from "../helpers/httpStatus";

export const schemaValidator = (schema) => {
    return (req, res, next) => {
        const { error } = schema.validate(req.body, { abortEarly: false });
        if (error) {
            const errorMessage = error.details.map((err) => err.message).join(', ');
            return res.status(HTTP_STATUS.BAD_REQUEST).json({ error: errorMessage });
        }
        next();
    };
};