import { z } from "zod";

// Define the schema for FormAccountingDocumentTableType
export const FormAccountingDocumentTableTypeSchema = z.object({
  group: z.string(),
  total: z.string(),
  moeen: z.string(),
  level_4: z.string(),
  level_5: z.string(),
  level_6: z.string(),
  description: z.string(),
  debtor: z.string(),
  creditor: z.string(),
});

// Define the schema for FormType
export const createFormSchema = z.object({
  title: z.string(),
  form_number: z.string(),
  description: z.string(),
  accounting_document_table: z.array(FormAccountingDocumentTableTypeSchema),
  appendices: z.union([z.string(), z.array(z.string())]),
  rules: z.string(),
  considerations: z.string(),
  time: z.string(),
  financial_Processing: z.string(),
  audit: z.string(),
});
