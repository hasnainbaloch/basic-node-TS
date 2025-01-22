// custome error utils types

export enum HttpStatusCode {
  SUCCESS = 200,
  CREATED = 201,
  UPDATED = 202,
  DELETED = 204,

  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  CONFLICT = 409,

  INTERNAL_ERROR = 500,
}

export type ResponseType = { message?: string; details?: unknown };

export type ErrorResponseType = {
  statusCode: HttpStatusCode;
  message: string;
  details?: unknown;
};
