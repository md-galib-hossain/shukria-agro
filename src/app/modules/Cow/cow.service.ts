import { Types } from "mongoose";
import ICow from "./cow.interface";
import { Cow } from "./cow.model";
import AppError from "../../errors/AppError";
import httpStatus from "http-status";

const createCow = async (data: ICow) => {
  const result = await Cow.create(data);
  return result;
};

const getAllCows = async () => {
  const result = await Cow.find({ isDeleted: { $ne: true } }).select("-isDeleted");
  return result;
};

const getSingleCow = async (id: string) => {
  if (!Types.ObjectId.isValid(id)) throw new AppError(httpStatus.BAD_REQUEST, "Invalid ID format");
  const result = await Cow.findOne({ _id: id, isDeleted: { $ne: true } });
  if (!result) throw new AppError(httpStatus.NOT_FOUND, "Cow not found");
  return result;
};

const softDeleteCow = async (id: string) => {
  if (!Types.ObjectId.isValid(id)) throw new AppError(httpStatus.BAD_REQUEST, "Invalid ID format");
  await Cow.findByIdAndUpdate(id, { isDeleted: true });
  return null;
};

const hardDeleteCow = async (id: string) => {
  if (!Types.ObjectId.isValid(id)) throw new AppError(httpStatus.BAD_REQUEST, "Invalid ID format");
  await Cow.findByIdAndDelete(id);
  return null;
};

export const CowService = {
  createCow,
  getAllCows,
  getSingleCow,
  softDeleteCow,
  hardDeleteCow,
};
