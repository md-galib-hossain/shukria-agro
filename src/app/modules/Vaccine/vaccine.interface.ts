import { Types } from "mongoose";

type ObjectId = Types.ObjectId;

interface IVaccine {
  _id?: ObjectId;
  name: string;
  interval: number;
  info?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export default IVaccine;
