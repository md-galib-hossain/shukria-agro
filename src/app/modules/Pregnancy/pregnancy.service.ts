import mongoose, { Types } from "mongoose";
import IPregnancy from "./pregnancy.interface";
import { Pregnancy } from "./pregnancy.model";
import AppError from "../../errors/AppError";
import httpStatus from "http-status";
import { Cow } from "../Cow/cow.model";

const createPregnancy = async (data: IPregnancy) => {
  const { cowUID } = data;
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const cow = await Cow.findById(cowUID);
    if (!cow) {
      throw new AppError(httpStatus.NOT_FOUND, "Cow not found");
    }

    const pregnancy = await Pregnancy.create([data]);
    cow.pregnancyRecords.push(pregnancy[0]._id);
    await cow.save();

    await session.commitTransaction();
    return pregnancy[0];
  } catch (error) {
    await session.abortTransaction();
    throw error;
  } finally {
    session.endSession();
  }
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
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const pregnancy = await Pregnancy.findById(id);
    if (!pregnancy) throw new AppError(httpStatus.NOT_FOUND, "Pregnancy not found");

    await Pregnancy.findByIdAndDelete(id);

    await Cow.findByIdAndUpdate(pregnancy.cowUID, {
      $pull: { pregnancyRecords: pregnancy._id }
    });

    await session.commitTransaction();
    return null;
  } catch (error) {
    await session.abortTransaction();
    throw error;
  } finally {
    session.endSession();
  }
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
