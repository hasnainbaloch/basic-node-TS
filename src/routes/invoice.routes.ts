import { Router, RequestHandler } from "express";
import {
  authenticateToken,
  authorizedRoles,
} from "@/middleware/auth.middleware";


import { UserRole } from "@/types/users.type";
import {
  createInvoiceController,
  deleteInvoiceByIdController,
  getAllInvoicesController,
  getInvoiceByIdController,
  getInvoiceByReferenceController,
  updateInvoiceByIdController,
} from "@/controllers/invoices.controller";
import { validate } from "@/middleware/validation.middleware";
import { InvoiceSchema } from "@/schemas/invoice.schema";

const router = Router();

// protected routes for admin and manager
router.post(
  "/invoice",
  authenticateToken,
  validate(InvoiceSchema) as RequestHandler,
  authorizedRoles(UserRole.ADMIN, UserRole.MANAGER) as RequestHandler,
  createInvoiceController as RequestHandler
);

// get all invoices
router.get(
  "/invoices",
  authenticateToken,
  authorizedRoles(UserRole.ADMIN, UserRole.MANAGER) as RequestHandler,
  getAllInvoicesController as RequestHandler
);

// get invoice by id
router.get(
  "/invoice/:id",
  authenticateToken,
  authorizedRoles(UserRole.ADMIN, UserRole.MANAGER) as RequestHandler,
  getInvoiceByIdController as RequestHandler
);

// update invoice by id
router.put(
  "/invoice/:id",
  authenticateToken,
  authorizedRoles(UserRole.ADMIN, UserRole.MANAGER) as RequestHandler,
  updateInvoiceByIdController as RequestHandler
);

// delete invoice by id
router.delete(
  "/invoice/:id",
  authenticateToken,
  authorizedRoles(UserRole.ADMIN) as RequestHandler,
  deleteInvoiceByIdController as RequestHandler
);

// get invoice by reference
router.get(
  "/invoice/reference/:reference",
  authenticateToken,
  getInvoiceByReferenceController as RequestHandler
);

export default router;
