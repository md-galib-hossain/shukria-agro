import IVaccine from "./vaccine.interface";
import { Vaccine } from "./vaccine.model";
import AppError from "../../errors/AppError";
import httpStatus from "http-status";
import { Types } from "mongoose";
import QueryBuilder from "../../builder/queryBuilder";
import { cowSearchableFields } from "../Cow/cow.constant";

const createVaccine = async (data: IVaccine) => {
  const result = await Vaccine.create(data);
  return result;
};

const getAllVaccines = async (query: Record<string, unknown>) => {
  const vaccineQuery = new QueryBuilder(Vaccine.find(), query)
    .search(cowSearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await vaccineQuery.modelQuery;
  const meta = await vaccineQuery.countTotal();
  return {
    result,
    meta,
  };
};

const getSingleVaccine = async (id: string) => {
  if (!Types.ObjectId.isValid(id))
    throw new AppError(httpStatus.BAD_REQUEST, "Invalid ID format");
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
