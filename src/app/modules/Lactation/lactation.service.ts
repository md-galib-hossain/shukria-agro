import { Types } from "mongoose";
import ILactation from "./lactation.interface";
import { Lactation } from "./lactation.model";
import AppError from "../../errors/AppError";
import httpStatus from "http-status";

const createLactation = async (data: ILactation) => {
  const result = await Lactation.create(data);
  return result;
};

const getAllLactations = async () => {
  const result = await Lactation.find({ isDeleted: { $ne: true } }).select(
    "-isDeleted"
  );
  return result;
};

const getSingleLactation = async (id: string) => {
  if (!Types.ObjectId.isValid(id))
    throw new AppError(httpStatus.BAD_REQUEST, "Invalid ID format");
  const result = await Lactation.findOne({ _id: id, isDeleted: { $ne: true } });
  if (!result)
    throw new AppError(httpStatus.NOT_FOUND, "Lactation record not found");
  return result;
};

const softDeleteLactation = async (id: string) => {
  if (!Types.ObjectId.isValid(id))
    throw new AppError(httpStatus.BAD_REQUEST, "Invalid ID format");
  await Lactation.findByIdAndUpdate(id, { isDeleted: true });
  return null;
};

const hardDeleteLactation = async (id: string) => {
  if (!Types.ObjectId.isValid(id))
    throw new AppError(httpStatus.BAD_REQUEST, "Invalid ID format");
  await Lactation.findByIdAndDelete(id);
  return null;
};

const updateLactation = async (id: string, data: Partial<ILactation>) => {
  if (!Types.ObjectId.isValid(id)) {
    throw new AppError(httpStatus.BAD_REQUEST, "Invalid ID format");
  }

  const lactation = await Lactation.findOne({
    _id: id,
    isDeleted: { $ne: true },
  });
  if (!lactation) {
    throw new AppError(httpStatus.NOT_FOUND, "Lactation record not found");
  }

  Object.keys(data).forEach((key) => {
    (lactation as any)[key] = data[key as keyof ILactation];
  });

  await lactation.save();

  return lactation;
};

export const LactationService = {
  createLactation,
  getAllLactations,
  getSingleLactation,
  softDeleteLactation,
  hardDeleteLactation,
  updateLactation,
};
