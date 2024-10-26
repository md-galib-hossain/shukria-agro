import { Types } from "mongoose";
import ICategory from "./category.interface";
import { Category } from "./category.model";
import AppError from "../../errors/AppError";
import httpStatus from "http-status";
const createCategory = async (data: ICategory) => {
  const result = await Category.create(data);
  return result;
};
const getAllCategories = async () => {
  const result = await Category.find({isDeleted: {$ne:true}}).select("-isDeleted");
  return result;
};
const getSingleCategory = async (id: string) => {
  if (!Types.ObjectId.isValid(id)) throw new AppError(httpStatus.BAD_REQUEST,"Invalid ID format");
  const result = await Category.findOne({ _id: id, isDeleted: { $ne: true } });
  return result;
};
const softDeleteCategory = async (id: string) => {
await Category.findByIdAndUpdate(id, { isDeleted: true });
return null
};
const hardDeleteCategory = async (id: string) => {
await Category.findByIdAndDelete(id);
return null
};

export const CategoryService = {
  createCategory,
  getAllCategories,
  getSingleCategory,softDeleteCategory,hardDeleteCategory
};
