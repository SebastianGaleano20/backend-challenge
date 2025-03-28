"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.schemaValidator = void 0;
const httpStatus_1 = __importDefault(require("../helpers/httpStatus"));
const schemaValidator = (schema) => {
    return (req, res, next) => {
        const { error } = schema.validate(req.body, { abortEarly: false }); // Capturamos el error
        if (error) {
            const errorMessage = error.details.map((err) => err.message).join(', ');
            res.status(httpStatus_1.default.BAD_REQUEST).json({ error: errorMessage });
        }
        next(); // Si no hay error sigue con el controlador
    };
};
exports.schemaValidator = schemaValidator;
