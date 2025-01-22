import { InvoiceStatus, InvoicePaymentStatus } from "../types/invoice.type";
import { z } from "zod";

// Zod Schema for Validation
export const InvoiceSchema = z.object({
  customerId: z.string().uuid(),
  items: z.array(
    z.object({
      sku: z.string().nonempty(),
      qty: z.number().int().positive(),
      price: z.number().positive(),
    })
  ).nonempty(),
  invoiceStatus: z.enum([InvoiceStatus.APPROVED, InvoiceStatus.PENDING]).optional(),
  paymentStatus: z.enum([
    InvoicePaymentStatus.PAID,
    InvoicePaymentStatus.UNPAID,
    InvoicePaymentStatus.OVERDUE,
  ]).optional(),
});

// update invoice schema
export const updateInvoiceSchema = InvoiceSchema.partial();

export type CreateInvoiceInput = z.infer<typeof InvoiceSchema>;
export type UpdateInvoiceInput = z.infer<typeof updateInvoiceSchema>;
