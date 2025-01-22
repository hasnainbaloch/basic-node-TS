import {
  ResponseType,
  HttpStatusCode,
  ErrorResponseType,
} from "../types/http.type";

export const httpError = {
  badRequest: ({ message, details }: ResponseType) => ({
    statusCode: HttpStatusCode.BAD_REQUEST,
    message,
    details,
  }),

  unauthorized: ({ message, details }: ResponseType): ErrorResponseType => ({
    statusCode: HttpStatusCode.UNAUTHORIZED,
    message: message ?? "Unauthorized",
    details,
  }),

  forbidden: ({ message, details }: ResponseType): ErrorResponseType => ({
    statusCode: HttpStatusCode.FORBIDDEN,
    message: message ?? "Forbidden",
    details,
  }),

  notFound: ({ message, details }: ResponseType): ErrorResponseType => ({
    statusCode: HttpStatusCode.NOT_FOUND,
    message: message ?? "Not Found",
    details,
  }),

  conflict: ({ message, details }: ResponseType): ErrorResponseType => ({
    statusCode: HttpStatusCode.CONFLICT,
    message: message ?? "Conflict",
    details,
  }),

  internal: ({ message, details }: ResponseType): ErrorResponseType => ({
    statusCode: HttpStatusCode.INTERNAL_ERROR,
    message: message ?? "Internal Server Error",
    details,
  }),
};
