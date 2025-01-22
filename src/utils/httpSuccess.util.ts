import { HttpStatusCode, ResponseType } from "@/types/http.type";

export const httpSuccess = {
  success: ({ message, details }: ResponseType) => ({
    statusCode: HttpStatusCode.SUCCESS,
    message,
    details,
  }),

  created: ({ message, details }: ResponseType) => ({
    statusCode: HttpStatusCode.CREATED,
    message,
    details,
  }),

  updated: ({ message, details }: ResponseType) => ({
    statusCode: HttpStatusCode.UPDATED,
    message,
    details,
  }),

  deleted: ({ message, details }: ResponseType) => ({
    statusCode: HttpStatusCode.DELETED,
    message,
    details,
  }),
};
