import { z } from "zod";

const createCategorySchema = z.object({
  body: z.object({
    name: z.string({ required_error: "Name is required" }).min(1),
    description: z.string({ required_error: "Description is required" }).min(1),
  }),
});
const updateCategorySchema = z.object({
  body: z.object({
    name: z.string().optional(),
    description: z.string().optional(),
  }),
});

export const CategoryValidation = {createCategorySchema,updateCategorySchema}
