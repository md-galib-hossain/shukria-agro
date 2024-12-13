import mongoose, { Types } from "mongoose";
import { MilkRecord } from "./milkrecord.model";
import AppError from "../../errors/AppError";
import httpStatus from "http-status";
import { IMilkRecord } from "./milkrecord.interface";
import { Lactation } from "../Lactation/lactation.model";
import QueryBuilder from "../../builder/queryBuilder";

const createMilkRecord = async (data: IMilkRecord) => {
  const result = await MilkRecord.create(data);

  await Lactation.findByIdAndUpdate(
    data.lactationId,
    { $inc: { totalYield: result.totalYield } },
    { new: true }
  );

  return result;
};

const getAllMilkRecords = async (query: Record<string, unknown>) => {
  const milkRecordQuery = new QueryBuilder(
    MilkRecord.find()
      .populate({ path: "cowOID", select: "name cowOID cowId" })
      .populate({ path: "lactationId", select: "lactationNumber" }),
    query
  )
    .search(["date"])
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await milkRecordQuery.modelQuery;
  const meta = await milkRecordQuery.countTotal();

  return {
    result,
    meta,
  };
};

const getSingleMilkRecord = async (id: string) => {
  if (!Types.ObjectId.isValid(id)) {
    throw new AppError(httpStatus.BAD_REQUEST, "Invalid ID format");
  }
  const result = await MilkRecord.findOne({
    _id: id,
    isDeleted: { $ne: true },
  });
  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, "Milk record not found");
  }
  return result;
};

const softDeleteMilkRecord = async (id: string) => {
  if (!Types.ObjectId.isValid(id)) {
    throw new AppError(httpStatus.BAD_REQUEST, "Invalid ID format");
  }
  await MilkRecord.findByIdAndUpdate(id, { isDeleted: true });
  return null;
};

const hardDeleteMilkRecord = async (id: string) => {
  if (!Types.ObjectId.isValid(id)) {
    throw new AppError(httpStatus.BAD_REQUEST, "Invalid ID format");
  }
  await MilkRecord.findByIdAndDelete(id);
  return null;
};

const updateMilkRecord = async (id: string, data: Partial<IMilkRecord>) => {
    if (!Types.ObjectId.isValid(id)) {
      throw new AppError(httpStatus.BAD_REQUEST, "Invalid ID format");
    }
  
    const session = await mongoose.startSession();
    session.startTransaction();
  
    try {
      const milkRecord = await MilkRecord.findOne({ _id: id, isDeleted: { $ne: true } }).session(session);
      if (!milkRecord) {
        throw new AppError(httpStatus.NOT_FOUND, "Milk record not found");
      }
  
      const originalTotalYield = milkRecord.totalYield ?? 0;
  
      const updatedYield = (data.morningYield ?? milkRecord.morningYield) + (data.eveningYield ?? milkRecord.eveningYield);
      milkRecord.totalYield = updatedYield;
  
      if (updatedYield > originalTotalYield) {
        const yieldDifference = updatedYield - originalTotalYield;
  
        await milkRecord.save({ session });
  
        await Lactation.findByIdAndUpdate(
          milkRecord.lactationId,
          { $inc: { totalYield: yieldDifference } },
          { session }
        );
      } else {
        Object.assign(milkRecord, data);
        await milkRecord.save({ session });
      }
  
      await session.commitTransaction();
      session.endSession();
  
      return milkRecord;
  
    } catch (error) {
      await session.abortTransaction();
      session.endSession();
      throw error;
    }
  };
  
  

export const MilkRecordService = {
  createMilkRecord,
  getAllMilkRecords,
  getSingleMilkRecord,
  softDeleteMilkRecord,
  hardDeleteMilkRecord,
  updateMilkRecord,
};
