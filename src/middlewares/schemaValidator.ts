import Joi from "joi";
import HTTP_STATUS from "../helpers/httpStatus";
import { Response, Request, NextFunction } from "express";

export const schemaValidator = (schema: Joi.Schema) => {
    return (req: Request, res: Response, next: NextFunction) => {
        const { error } = schema.validate(req.body, { abortEarly: false });
        if (error) {
            const errorMessage = error.details.map((err) => err.message).join(', ');
            return res.status(HTTP_STATUS.BAD_REQUEST).json({ error: errorMessage });
        }
        next();
    };
};