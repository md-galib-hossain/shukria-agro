import { Types } from "mongoose";

type ObjectId = Types.ObjectId;

export interface IVaccination {
  _id?: ObjectId;
  vaccineId: ObjectId;
  vaccinatedDate: Date;
  nextVaccinationDate?: Date;
  isDeleted: boolean
}

interface ICow {
  _id?: ObjectId;
  cowId?: string;
isDeleted: boolean;
  name: string;
  dateOfBirth: Date;
  sex: "Male" | "Female";
  categoryId: ObjectId;
  sire?: ObjectId;
  dam?: ObjectId;
  vaccinations: IVaccination[];
  currentPregnancyStatus: boolean;
  lactations: ObjectId[];
  pregnancyRecords: ObjectId[];
  createdAt?: Date;
  updatedAt?: Date;
}

export default ICow;
