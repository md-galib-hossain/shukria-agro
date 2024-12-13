import { Types } from "mongoose";
import ILactation from "./lactation.interface";
import { Lactation } from "./lactation.model";
import AppError from "../../errors/AppError";
import httpStatus from "http-status";
import { lactationSearchableFields } from "./lactation.constant";
import QueryBuilder from "../../builder/queryBuilder";

const createLactation = async (data: ILactation) => {
  
  const result = await Lactation.create(data);
  return result;
};

const getAllLactations = async (query: Record<string, unknown>) => {
  const lactationQuery = new QueryBuilder(
    Lactation.find({ isDeleted: { $ne: true } }) .populate({ path: "cowOID", select: "_id cowId name" }),
    query
  )
    .search(lactationSearchableFields) 
    .filter()
    .sort()
    .paginate()
    .fields();
  
  const result = await lactationQuery.modelQuery;
  const meta = await lactationQuery.countTotal();
  
  return {
    result,
    meta,
  };
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
