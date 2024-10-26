import IVaccine from "./vaccine.interface";
import { Vaccine } from "./vaccine.model";
import AppError from "../../errors/AppError";
import httpStatus from "http-status";
import { Types } from "mongoose";

const createVaccine = async (data: IVaccine) => {
  const result = await Vaccine.create(data);
  return result;
};

const getAllVaccines = async () => {
  const result = await Vaccine.find({ isDeleted: { $ne: true } }).select("-isDeleted");
  return result;
};

const getSingleVaccine = async (id: string) => {
  if (!Types.ObjectId.isValid(id)) throw new AppError(httpStatus.BAD_REQUEST, "Invalid ID format");
  const result = await Vaccine.findOne({ _id: id, isDeleted: { $ne: true } });
  return result;
};

const softDeleteVaccine = async (id: string) => {
  await Vaccine.findByIdAndUpdate(id, { isDeleted: true });
  return null;
};

const hardDeleteVaccine = async (id: string) => {
  await Vaccine.findByIdAndDelete(id);
  return null;
};

export const VaccineService = {
  createVaccine,
  getAllVaccines,
  getSingleVaccine,
  softDeleteVaccine,
  hardDeleteVaccine,
};
