import { model, Schema } from "mongoose";
import ICow,{ IVaccination }  from "./cow.interface"; // Adjust the import based on your file structure
import { cowSex } from "./cow.constant";

const vaccinationSchema = new Schema<IVaccination>({
  vaccineId: { type: Schema.Types.ObjectId, ref: "Vaccine", required: true },
  vaccinatedDate: { type: Date, required: true },
  nextVaccinationDate: { type: Date }
});

const cowSchema = new Schema<ICow>({
  name: {
    type: String,
    default: "Unknown"
  },
  dateOfBirth: {
    type: Date,
    required: true
  },
  sex: {
    type: String,
    enum: cowSex,
    required: true
  },
  categoryId: {
    type: Schema.Types.ObjectId,
    ref: "Category",
    required: true
  },
  sire: {
    type: Schema.Types.ObjectId,
    ref: "Cow",
    default: null
  },
  dam: {
    type: Schema.Types.ObjectId,
    ref: "Cow",
    default: null
  },
  vaccinations: {
    type: [vaccinationSchema], 
    default: []
  },
  currentPregnancyStatus: {
    type: Boolean,
    default: false
  },
  lactations: [{
    type: Schema.Types.ObjectId,
    ref: "Lactation",
    default: null
  }],
  pregnancyRecords: [{
    type: Schema.Types.ObjectId,
    ref: "Pregnancy",
    default: null

  }]
}, { timestamps: true }); 


export const Cow = model<ICow>('Cow',cowSchema)
