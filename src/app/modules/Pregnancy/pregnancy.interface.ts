import { Types } from "mongoose";

type ObjectId = Types.ObjectId;

interface IPregnancy {
  _id?: ObjectId;
  cowId: ObjectId; 
  aiState?: boolean; 
  checkStatus?: 'Pending' | 'Confirmed' | 'Failed';
  checkedDate?: Date; 
  semenInfo?: string; 
  deliveryStatus?: 'Not Due' | 'Due Soon' | 'Delivered';
  createdAt?: Date;
  updatedAt?: Date;
}

export default IPregnancy;
