import { model, Schema } from "mongoose";
import ILactation from "./lactation.interface"; // Adjust the path based on your file structure

const lactationSchema = new Schema<ILactation>(
  {
    cowOID: { type: Schema.Types.ObjectId, ref: 'Cow', required: true },
    lactationNumber: { type: Number, required: true },
    lactationDate: { type: Date, required: true },
    milkYield: { type: Number, default: 0 } ,
    isDeleted: {
      type: Boolean,
      default:false
    }
 
  },
  { timestamps: true }
);

export const Lactation = model<ILactation>("Lactation", lactationSchema);
