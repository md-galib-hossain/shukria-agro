import { Types } from "mongoose";

type ObjectId = Types.ObjectId;

export interface IVaccination {
  vaccineId: ObjectId;
  vaccinatedDate: Date;
  nextVaccinationDate?: Date;
}

interface ICow {
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
