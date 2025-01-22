import { Router } from "express";
import {
  authenticateToken,
  authorizedRoles,
} from "../middleware/auth.middleware";

import { UserRole } from "../types/users.type";
import {
  createInvoiceController,
  deleteInvoiceByIdController,
  getAllInvoicesController,
  getInvoiceByIdController,
  getInvoiceByReferenceController,
  updateInvoiceByIdController,
} from "../controllers/invoices.controller";
import { validate } from "../middleware/validation.middleware";
import { InvoiceSchema } from "../schemas/invoice.schema";

const router = Router();

// protected routes for admin and manager
router.post(
  "/invoice",
  authenticateToken,
  validate(InvoiceSchema),
  authorizedRoles(UserRole.ADMIN, UserRole.MANAGER),
  createInvoiceController
);

// get all invoices
router.get(
  "/invoices",
  authenticateToken,
  authorizedRoles(UserRole.ADMIN, UserRole.MANAGER),
  getAllInvoicesController
);

// get invoice by id
router.get(
  "/invoice/:id",
  authenticateToken,
  authorizedRoles(UserRole.ADMIN, UserRole.MANAGER),
  getInvoiceByIdController
);

// update invoice by id
router.put(
  "/invoice/:id",
  authenticateToken,
  authorizedRoles(UserRole.ADMIN, UserRole.MANAGER),
  updateInvoiceByIdController
);

// delete invoice by id
router.delete(
  "/invoice/:id",
  authenticateToken,
  authorizedRoles(UserRole.ADMIN),
  deleteInvoiceByIdController
);

// get invoice by reference
router.get(
  "/invoice/reference/:reference",
  authenticateToken,
  getInvoiceByReferenceController
);

export default router;
