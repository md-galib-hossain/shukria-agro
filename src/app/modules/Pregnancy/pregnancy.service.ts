import { Types } from "mongoose";
import IPregnancy from "./pregnancy.interface";
import { Pregnancy } from "./pregnancy.model";
import AppError from "../../errors/AppError";
import httpStatus from "http-status";

const createPregnancy = async (data: IPregnancy) => {
  const result = await Pregnancy.create(data);
  return result;
};

const getAllPregnancies = async () => {
  const result = await Pregnancy.find({ isDeleted: { $ne: true } }).select(
    "-isDeleted"
  );
  return result;
};

const getSinglePregnancy = async (id: string) => {
  if (!Types.ObjectId.isValid(id))
    throw new AppError(httpStatus.BAD_REQUEST, "Invalid ID format");
  const result = await Pregnancy.findOne({ _id: id, isDeleted: { $ne: true } });
  return result;
};

const softDeletePregnancy = async (id: string) => {
  await Pregnancy.findByIdAndUpdate(id, { isDeleted: true });
  return null;
};

const hardDeletePregnancy = async (id: string) => {
  await Pregnancy.findByIdAndDelete(id);
  return null;
};
const updatePregnancy = async (id: string, data: Partial<IPregnancy>) => {
  if (!Types.ObjectId.isValid(id))
    throw new AppError(httpStatus.BAD_REQUEST, "Invalid ID format");
  const pregnancy = await Pregnancy.findOne({
    _id: id,
    isDeleted: { $ne: true },
  });
  if (!pregnancy)
    throw new AppError(
      httpStatus.NOT_FOUND,
      "Pregnancy period record not found"
    );
  Object.keys(data).forEach((key) => {
    (pregnancy as any)[key] = data[key as keyof IPregnancy];
  });
  await pregnancy.save();
  return pregnancy;
};

export const PregnancyService = {
  createPregnancy,
  getAllPregnancies,
  getSinglePregnancy,
  softDeletePregnancy,
  hardDeletePregnancy,updatePregnancy
};
