import { z } from "zod";

const createCategorySchema = z.object({
  body: z.object({
    name: z.string({ required_error: "Name is required" }).min(1),
    description: z.string({ required_error: "Description is required" }).min(1),
  }),
});

export const CategoryValidation = {createCategorySchema}
