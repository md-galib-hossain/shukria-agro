import { z } from "zod";

const createMilkRecordSchema = z.object({
    body: z.object({
        lactationId: z.string({ required_error: "Lactation ID is required" }).min(1),
        cowId: z.string({ required_error: "Cow ID is required" }).min(1),
        date: z.string({ required_error: "Date is required" }),
        morningYield: z.number({ required_error: "Morning yield is required" }).min(0),
        eveningYield: z.number({ required_error: "Evening yield is required" }).min(0),
        totalYield: z.number().optional().nullable(),
        isDeleted: z.boolean().optional(),
      })
})



const updateMilkRecordSchema = z.object({
  body: z.object({
    lactationId: z.string().optional(),
    cowId: z.string().optional(),
    date: z.string().optional(),
    morningYield: z.number().optional(),
    eveningYield: z.number().optional(),
    totalYield: z.number().optional().nullable(),
    isDeleted: z.boolean().optional(),
  }),
});


export const MilkValidation = {
  createMilkRecordSchema,
  updateMilkRecordSchema
};
