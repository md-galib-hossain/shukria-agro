import { Types } from "mongoose";
import ICow, { IVaccination } from "./cow.interface";
import { Cow } from "./cow.model";
import AppError from "../../errors/AppError";
import httpStatus from "http-status";
import QueryBuilder from "../../builder/queryBuilder";
import { cowSearchableFields } from "./cow.constant";
interface IVaccinationWithId extends IVaccination {
  vaccinationId?: string; 
}
const createCow = async (data: ICow) => {
  console.log(data);
  const result = await Cow.create(data);

  return result;
};

const getAllCows = async (query: Record<string, unknown>) => {
  // const result = await Cow.find({ isDeleted: { $ne: true } }).select("-isDeleted");
  // return result;
  const cowQuery = new QueryBuilder(
    Cow.find()
      .populate({ path: "categoryId", select: "_id name description" })
      .populate({ path: "sire", select: "-isDeleted -__v" })
      .populate({ path: "dam", select: "-isDeleted -__v" })
      .populate({ path: "vaccinations.vaccineId", select: "-isDeleted -__v" })
      .populate({ path: "lactations", select: "-isDeleted -__v" })
      .populate({ path: "pregnancyRecords", select: "-isDeleted -__v" }),
    query
  )
    .search(cowSearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();
  const result = await cowQuery.modelQuery;
  const meta = await cowQuery.countTotal();
  return {
    result,
    meta,
  };
};

const getSingleCow = async (id: string) => {
  if (!Types.ObjectId.isValid(id))
    throw new AppError(httpStatus.BAD_REQUEST, "Invalid ID format");
  const result = await Cow.findOne({ _id: id, isDeleted: { $ne: true } });
  if (!result) throw new AppError(httpStatus.NOT_FOUND, "Cow not found");
  return result;
};

const softDeleteCow = async (id: string) => {
  if (!Types.ObjectId.isValid(id))
    throw new AppError(httpStatus.BAD_REQUEST, "Invalid ID format");
  await Cow.findByIdAndUpdate(id, { isDeleted: true });
  return null;
};

const hardDeleteCow = async (id: string) => {
  if (!Types.ObjectId.isValid(id))
    throw new AppError(httpStatus.BAD_REQUEST, "Invalid ID format");
  await Cow.findByIdAndDelete(id);
  return null;
};

const updateCow = async (id: string, data: Partial<ICow>) => {
  if (!Types.ObjectId.isValid(id)) {
    throw new AppError(httpStatus.BAD_REQUEST, "Invalid ID format");
  }

  const cow = await Cow.findOne({ _id: id, isDeleted: { $ne: true } });
  if (!cow) {
    throw new AppError(httpStatus.NOT_FOUND, "Cow not found");
  }

  Object.keys(data).forEach((key) => {
    const value = data[key as keyof ICow];

    if (Array.isArray(value)) {
      if (key === "vaccinations") {
        value.forEach((newVaccination) => {
          const { vaccinationId, vaccineId, vaccinatedDate, nextVaccinationDate, isDeleted } = newVaccination as IVaccinationWithId;

          if (vaccinationId) {
            const existingVaccinationIndex = cow.vaccinations.findIndex(
              (vaccination) => vaccination._id!.toString() === vaccinationId
            );

            if (existingVaccinationIndex === -1) {
              throw new AppError(httpStatus.NOT_FOUND, `No vaccination found with ID: ${vaccinationId}`);
            }
         
            cow.vaccinations[existingVaccinationIndex] = {
              ...cow.vaccinations[existingVaccinationIndex],
              vaccineId,
              vaccinatedDate,
              nextVaccinationDate,
              isDeleted 
            };
          } else {
            cow.vaccinations.push({ vaccineId, vaccinatedDate, nextVaccinationDate, isDeleted: false });
          }
        });
      } else if (key === "lactations") {
        (value as ICow["lactations"]).forEach((lactationId) => {
          if (cow.lactations.includes(lactationId)) {
            throw new AppError(httpStatus.CONFLICT, `Lactation ID ${lactationId} already exists`);
          }
          cow.lactations.push(lactationId);
        });
      } else if (key === "pregnancyRecords") {
        (value as ICow["pregnancyRecords"]).forEach((pregnancyRecordId) => {
          if (cow.pregnancyRecords.includes(pregnancyRecordId)) {
            throw new AppError(httpStatus.CONFLICT, `Pregnancy Record ID ${pregnancyRecordId} already exists`);
          }
          cow.pregnancyRecords.push(pregnancyRecordId);
        });
      }
    } else {
      (cow as any)[key] = value;
    }
  });

  await cow.save();

  return cow;
};







export const CowService = {
  createCow,
  getAllCows,
  getSingleCow,
  softDeleteCow,
  hardDeleteCow,
  updateCow,
};
