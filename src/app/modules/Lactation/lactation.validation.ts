import { z } from "zod";

const baseLactationSchema = z.object({
  cowOID: z.string({ required_error: "Cow ID is required" }).min(1),
  lactationNumber: z.number({ required_error: "Lactation number is required" }).int(),
  lactationStartDate: z.string({ required_error: "Lactation start date is required" }),
  lactationEndDate: z.string().optional(),
  milkYield: z.number().optional().default(0),
  isDeleted: z.boolean().optional().default(false),
});

const createLactationSchema = z.object({
  body: baseLactationSchema,
});

const updateLactationSchema = z.object({
  body: baseLactationSchema.partial(),
});

export const LactationValidation = { createLactationSchema, updateLactationSchema };
