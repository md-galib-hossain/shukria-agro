import { model, Schema } from "mongoose";
import ICategory from "./category.interface"; // Adjust the path based on your file structure

const cowCategorySchema = new Schema<ICategory>(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
  },
  { timestamps: true }
);

export const Category = model<ICategory>("Category", cowCategorySchema);
