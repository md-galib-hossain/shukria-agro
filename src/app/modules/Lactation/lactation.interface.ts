import { Types } from "mongoose";

type ObjectId = Types.ObjectId;

interface ILactation {
  _id?: ObjectId; 
  cowId: ObjectId; 
  lactationNumber: number; 
  lactationDate: Date; 
  milkYield?: number; 
  createdAt?: Date; 
  updatedAt?: Date; 
}

export default ILactation;
