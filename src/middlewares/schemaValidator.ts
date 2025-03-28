import Joi from "joi";
import HTTP_STATUS from "../helpers/httpStatus";
import { Response, Request, NextFunction } from "express";

export const schemaValidator = (schema: Joi.ObjectSchema) => { // Recibimos el schema a validar
    return (req: Request, res: Response, next: NextFunction): void => {
        const { error } = schema.validate(req.body, { abortEarly: false }); // Capturamos el error
        if (error) {
            const errorMessage = error.details.map((err) => err.message).join(', ');
            res.status(HTTP_STATUS.BAD_REQUEST).json({ error: errorMessage });
        }
        next(); // Si no hay error sigue con el controlador
    };
};