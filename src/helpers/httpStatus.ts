import type { HttpStatus } from '../types/helpers/index'
// Codigos HTTP para respuestas al usuario
const httpStatus: HttpStatus = {
    OK: 200,
    CREATED: 201,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    UNPROCESSABLE_ENTITY: 422,
    NOT_FOUND: 404,
    INTERNAL_SERVER_ERROR: 500
};

export default httpStatus;