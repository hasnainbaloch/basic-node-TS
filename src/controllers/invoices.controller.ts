import {
  createInvoiceService,
  deleteInvoiceByIdService,
  getAllInvoicesService,
  getInvoiceByIdService,
  getInvoiceByReferenceService,
  updateInvoiceByIdService,
} from "@/services/invoice.service";
import { HttpStatusCode } from "@/types/http.type";
import { httpError } from "@/utils/httpError.util";
import { httpSuccess } from "@/utils/httpSuccess.util";
import { logger } from "@/utils/logger.util";
import { NextFunction, Request, Response } from "express";

export const createInvoiceController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    console.log("controller invoice...", req.body);
    const invoice = await createInvoiceService(req.body);
    if (!invoice) {
      return next(httpError.badRequest({ message: "invoice not created" }));
    }

    logger.info("Invoice created successfully");
    return res.status(HttpStatusCode.CREATED).json(
      httpSuccess.created({
        message: "Invoice created successfully",
        details: invoice,
      })
    );
  } catch (error) {
    logger.error("Error creating invoice:", error);
    return next(httpError.internal({ message: "Internal server error" }));
  }
};

// get all invoices
export const getAllInvoicesController = async (
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const invoices = await getAllInvoicesService();
    if (!invoices) {
      return next(httpError.badRequest({ message: "invoices not found" }));
    }
    logger.info("Invoices fetched successfully");
    return res.status(HttpStatusCode.SUCCESS).json(
      httpSuccess.success({
        message: "Invoices fetched successfully",
        details: invoices,
      })
    );
  } catch (error) {
    logger.error("Error fetching invoices:", error);
    return next(httpError.internal({ message: "Internal server error" }));
  }
};

export const getInvoiceByIdController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const invoice = await getInvoiceByIdService(req.params.id);
    if (!invoice) {
      return next(httpError.badRequest({ message: "invoice not found" }));
    }
    logger.info("Invoice fetched successfully");
    return res.status(HttpStatusCode.SUCCESS).json(
      httpSuccess.success({
        message: "Invoice fetched successfully",
        details: invoice,
      })
    );
  } catch (error) {
    logger.error("Error fetching invoice by id:", error);
    return next(httpError.internal({ message: "Internal server error" }));
  }
};

// update invoice by id
export const updateInvoiceByIdController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const invoice = await updateInvoiceByIdService(req.params.id, req.body);
    if (!invoice) {
      return next(httpError.badRequest({ message: "invoice not found" }));
    }
    logger.info("Invoice updated successfully");
    return res.status(HttpStatusCode.SUCCESS).json(
      httpSuccess.success({
        message: "Invoice updated successfully",
        details: invoice,
      })
    );
  } catch (error) {
    logger.error("Error updating invoice by id:", error);
    return next(httpError.internal({ message: "Internal server error" }));
  }
};

// delete invoice by id
export const deleteInvoiceByIdController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const invoice = await deleteInvoiceByIdService(req.params.id);
    if (!invoice) {
      return next(httpError.badRequest({ message: "invoice not found" }));
    }
    logger.info("Invoice deleted successfully");
    return res.status(HttpStatusCode.SUCCESS).json(
      httpSuccess.success({
        message: "Invoice deleted successfully",
        details: invoice,
      })
    );
  } catch (error) {
    logger.error("Error deleting invoice by id:", error);
    return next(httpError.internal({ message: "Internal server error" }));
  }
};

// get invoice by reference
export const getInvoiceByReferenceController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const invoice = await getInvoiceByReferenceService(req.params.reference);
    if (!invoice) {
      return next(httpError.badRequest({ message: "invoice not found" }));
    }
    logger.info("Invoice fetched successfully");
    return res.status(HttpStatusCode.SUCCESS).json(
      httpSuccess.success({
        message: "Invoice fetched successfully",
        details: invoice,
      })
    );
  } catch (error) {
    logger.error("Error fetching invoice by reference:", error);
    return next(httpError.internal({ message: "Internal server error" }));
  }
};
