import { model, Schema } from "mongoose";
import { IMilkRecord } from "./milkrecord.interface";

const milkRecordSchema = new Schema<IMilkRecord>(
  {
    cowId: { type: Schema.Types.ObjectId, ref: "Cow", required: true },
    lactationId: { type: Schema.Types.ObjectId, ref: "Lactation", required: true },
    date: { type: Date, required: true },
    morningYield: { type: Number, default: 0, required: true },
    eveningYield: { type: Number, default: 0, required: true },
    totalYield: { type: Number, default: 0, required: true },
    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true }
);

milkRecordSchema.pre<IMilkRecord>("save", function (next) {
  this.totalYield = this.morningYield + this.eveningYield;
  next();
});

milkRecordSchema.index({ cowId: 1, lactationId: 1, date: 1 }, { unique: true });

export const MilkRecord = model<IMilkRecord>("MilkRecord", milkRecordSchema);
