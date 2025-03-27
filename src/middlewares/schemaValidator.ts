import Joi from "joi";
import HTTP_STATUS from "../helpers/httpStatus";
import { Response, Request, NextFunction } from "express";

export const schemaValidator = (schema: Joi.ObjectSchema) => {
    return (req: Request, res: Response, next: NextFunction): void => {
        const { error } = schema.validate(req.body, { abortEarly: false });
        // Si hay un error, se maneja la respuesta
        if (error) {
            const errorMessage = error.details.map((err) => err.message).join(', ');
            res.status(HTTP_STATUS.BAD_REQUEST).json({ error: errorMessage });
        }
        // Si no hay error, pasamos al siguiente middleware
        next(); // Esto es lo que permite que Express continúe procesando la solicitud
    };
};