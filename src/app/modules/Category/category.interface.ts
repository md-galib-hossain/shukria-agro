import { Types } from "mongoose";

type ObjectId = Types.ObjectId;

interface ICategory {
  _id?: ObjectId; 
  name: string; 
  description: string; 
  createdAt?: Date; 
  updatedAt?: Date;
}
export default ICategory;
