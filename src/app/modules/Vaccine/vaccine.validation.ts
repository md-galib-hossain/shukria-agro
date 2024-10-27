import { z } from "zod";

const createVaccineSchema = z.object({
  body: z.object({
    name: z.string({ required_error: "Name is required" }).min(1),
    interval: z.number({ required_error: "Interval is required" }).int().min(1),
    info: z.string().optional(),
    isDeleted: z.boolean().optional().default(false),
  }),
});

export const VaccineValidation = { createVaccineSchema };
