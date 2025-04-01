import { Response } from "express";

type ErrorHandlerFunction = (res: Response, error: Error) => void;

export interface ErrorHandler {
  sqlError: ErrorHandlerFunction;
  genericError: ErrorHandlerFunction;
  defaultError: ErrorHandlerFunction;
  [key: string]: ErrorHandlerFunction; //Acceso dinamico - firma de indice
}
/* Firma de índice: Permite agregar dinámicamente más propiedades de tipo ErrorHandlerFunction 
con cualquier clave de tipo string. */