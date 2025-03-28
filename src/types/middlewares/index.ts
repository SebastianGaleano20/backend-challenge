import { Response } from "express";

type ErrorHandlerFunction = (res: Response, error: Error) => void;

export interface ErrorHandler {
  sqlError: ErrorHandlerFunction;
  genericError: ErrorHandlerFunction;
  defaultError: ErrorHandlerFunction;
  [key: string]: ErrorHandlerFunction; //Acceso dinamico - firma de indice
}
