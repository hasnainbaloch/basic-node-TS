import { logger } from "@/utils/logger.util";
import AppDataSource from "@/database";
import { Invoice } from "@/database/entities";
import {
  CreateInvoiceInput,
  UpdateInvoiceInput,
} from "@/schemas/invoice.schema";

const invoiceRepository = AppDataSource.getRepository(Invoice);

export const createInvoiceService = async (invoiceData: CreateInvoiceInput) => {
  try {
    // Validate customerId is a valid UUID
    if (!invoiceData.customerId) {
      return null;
    }

    // Create new invoice with explicit type casting
    const invoiceToCreate = {
      customerId: String(invoiceData.customerId),
      items: invoiceData.items.map((item) => ({
        sku: String(item.sku),
        qty: Number(item.qty),
        price: Number(item.price),
      })),
    };

    const newInvoice = invoiceRepository.create(invoiceToCreate);

    // save the invoice
    const savedInvoice = await invoiceRepository.save(newInvoice);

    return savedInvoice;
  } catch (error) {
    logger.error("Error in createInvoiceService:", error);
    if (error instanceof Error) {
      logger.error("Error in createInvoiceService:", error);
    }
    throw error;
  }
};

// get all invoices
export const getAllInvoicesService = async () => {
  try {
    const invoices = await invoiceRepository.find();
    if (!invoices) {
      return null;
    }
    return invoices;
  } catch (error) {
    logger.error("Error in getAllInvoicesService:", error);
    return null;
  }
};

export const getInvoiceByIdService = async (id: string) => {
  try {
    const invoice = await invoiceRepository.findOne({ where: { id } });
    if (!invoice) {
      return null;
    }
    return invoice;
  } catch (error) {
    logger.error("Error in getInvoiceByIdService:", error);
    return null;
  }
};

// update invoice by id
export const updateInvoiceByIdService = async (
  id: string,
  invoiceData: UpdateInvoiceInput
) => {
  try {
    const invoice = await invoiceRepository.findOne({ where: { id } });
    if (!invoice) {
      return null;
    }
    invoiceRepository.merge(invoice, invoiceData);
    const updatedInvoice = await invoiceRepository.save(invoice);
    return updatedInvoice;
  } catch (error) {
    logger.error("Error in updateInvoiceByIdService:", error);
    return null;
  }
};

// delete invoice by id
export const deleteInvoiceByIdService = async (id: string) => {
  try {
    const invoice = await invoiceRepository.findOne({ where: { id } });
    if (!invoice) {
      return null;
    }
    await invoiceRepository.remove(invoice);
    return invoice;
  } catch (error) {
    logger.error("Error in deleteInvoiceByIdService:", error);
    return null;
  }
};

// get invoice by reference
export const getInvoiceByReferenceService = async (reference: string) => {
  try {
    const invoice = await invoiceRepository.findOne({ where: { reference } });
    if (!invoice) {
      return null;
    }
    return invoice;
  } catch (error) {
    logger.error("Error in getInvoiceByReferenceService:", error);
    return null;
  }
};
