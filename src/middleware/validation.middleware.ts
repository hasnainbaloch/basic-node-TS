import { Request, Response, NextFunction } from "express";
import { AnyZodObject, ZodError } from "zod";

export const validate =
  (schema: AnyZodObject, source: "body" | "query" | "params" = "body") =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      req[source] = await schema.parseAsync(req[source]); // Attach parsed data
      return next();
    } catch (error) {
      if (error instanceof ZodError) {
        console.error("Validation Error:", error.errors);
        return res.status(400).json({
          status: "error",
          message: "Validation failed",
          statusCode: 400,
          errors: error.errors.map((err) => ({
            path: err.path.join("."),
            message: err.message,
          })),
        });
      }
      return next(error); // Pass non-Zod errors to global error handler
    }
  };
