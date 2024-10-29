import { z } from "zod";

const createLactationSchema = z.object({
  body: z.object({
    cowId: z.string({ required_error: "Cow ID is required" }).min(1),
    lactationNumber: z.number({ required_error: "Lactation number is required" }).int(),
    lactationDate: z.string({ required_error: "Lactation date is required" }),
    milkYield: z.number().optional().default(0),
    isDeleted: z.boolean().optional().default(false),
  }),
});
const updateLactationSchema = z.object({
  body: z.object({
    cowId: z.string().optional(),
    lactationNumber: z.number().optional(),
    lactationDate: z.string().optional(),
    milkYield: z.number().optional().default(0),
    isDeleted: z.boolean().optional().default(false),
  }),
});

export const LactationValidation = { createLactationSchema,updateLactationSchema };
