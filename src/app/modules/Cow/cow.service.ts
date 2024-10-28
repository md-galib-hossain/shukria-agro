import { Types } from "mongoose";
import ICow from "./cow.interface";
import { Cow } from "./cow.model";
import AppError from "../../errors/AppError";
import httpStatus from "http-status";
import QueryBuilder from "../../builder/queryBuilder";
import { cowSearchableFields } from "./cow.constant";

const createCow = async (data: ICow) => {
  console.log(data)
  const result = await Cow.create(data);

  return result;
};

const getAllCows = async (query: Record<string, unknown>) => {
  // const result = await Cow.find({ isDeleted: { $ne: true } }).select("-isDeleted");
  // return result;
const cowQuery = new QueryBuilder(Cow.find()
.populate({ path: 'categoryId', select: '-isDeleted -__v' })        
.populate({ path: 'sire', select: '-isDeleted -__v' })              
.populate({ path: 'dam', select: '-isDeleted -__v' })               
.populate({ path: 'vaccinations.vaccineId', select: '-isDeleted -__v' }) 
.populate({ path: 'lactations', select: '-isDeleted -__v' })         
.populate({ path: 'pregnancyRecords', select: '-isDeleted -__v' }),query ) .search(cowSearchableFields)
.filter()
.sort()
.paginate()
.fields();  

const result = await cowQuery.modelQuery
return result
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
