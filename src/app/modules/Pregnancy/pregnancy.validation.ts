import { z } from "zod";

const createPregnancySchema = z.object({
  body: z.object({
    cowId: z.string({ required_error: "Cow ID is required" }).min(1),
    aiState: z.boolean().optional().default(false),
    checkStatus: z.enum(['Pending', 'Confirmed', 'Failed']).optional().default('Pending'),
    checkedDate: z.date().optional(),
    semenInfo: z.string().optional(),
    deliveryStatus: z.enum(['Not Due', 'Due Soon', 'Delivered']).optional().default('Not Due'),
    isDeleted: z.boolean().optional().default(false),
  }),
});
const updatedPregnancySchema = z.object({
  body: z.object({
    cowId: z.string().optional(),
    aiState: z.boolean().optional(),
    checkStatus: z.enum(['Pending', 'Confirmed', 'Failed']).optional(),
    checkedDate: z.date().optional(),
    semenInfo: z.string().optional(),
    deliveryStatus: z.enum(['Not Due', 'Due Soon', 'Delivered']).optional(),
    isDeleted: z.boolean().optional(),
  }),
});

export const PregnancyValidation = { createPregnancySchema,updatedPregnancySchema };
