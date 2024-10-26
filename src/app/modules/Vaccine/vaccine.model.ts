import { model, Schema } from "mongoose";
import IVaccine from "./vaccine.interface";

const vaccineSchema = new Schema<IVaccine>(
  {
    name: { type: String, required: true },
    interval: { type: Number, required: true },
    info: { type: String },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export const Vaccine = model<IVaccine>("Vaccine", vaccineSchema);
