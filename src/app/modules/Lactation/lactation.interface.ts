import { Types } from "mongoose";

type ObjectId = Types.ObjectId;

interface ILactation {
  _id?: ObjectId; 
  cowUID: ObjectId; 
  lactationNumber: number; 
  lactationDate: Date; 
  milkYield?: number; 
  createdAt?: Date; 
  updatedAt?: Date;
  isDeleted: boolean 
}

export default ILactation;
