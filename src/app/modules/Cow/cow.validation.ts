import { z } from "zod";
import { cowSex } from "./cow.constant";

const vaccinationSchema = z.object({
  vaccineId: z.string({ required_error: "Vaccine ID is required" }).min(1),
  vaccinatedDate: z.string({ required_error: "Vaccinated date is required" }),
  nextVaccinationDate: z.string().optional(),
});

const createCowSchema = z.object({
  body: z.object({
    name: z.string({ required_error: "Name is required" }),
    cowId: z.string({ required_error: "Cow Id is required" }),
    dateOfBirth: z.string({ required_error: "Date of birth is required" }),
    sex: z.enum(cowSex, { required_error: "Sex is required" }),
    categoryId: z.string({ required_error: "Category ID is required" }).min(1),
    sire: z.string().optional().nullable(),
    dam: z.string().optional().nullable(),
    vaccinations: z.array(vaccinationSchema).optional(),
    currentPregnancyStatus: z.boolean().optional(),
    lactations: z.array(z.string()).optional(),
    pregnancyRecords: z.array(z.string()).optional(),
    isDeleted: z.boolean().optional(),
  }),
});
const updateCowSchema = z.object({
  body: z.object({
    name: z.string().optional(),
    cowId: z.string().optional(),
    dateOfBirth: z.string().optional(),
    sex: z.enum(cowSex).optional(),
    categoryId: z.string().optional(),
    sire: z.string().optional().nullable(),
    dam: z.string().optional().nullable(),
    vaccinations: z.array(vaccinationSchema).optional(),
    currentPregnancyStatus: z.boolean().optional(),
    lactations: z.array(z.string()).optional(),
    pregnancyRecords: z.array(z.string()).optional(),
    isDeleted: z.boolean().optional(),
  }),
});

export const softDeleteSchema= z.object({
    body:z.object({
        isDeleted: z.boolean().optional(),
    })
})

export const CowValidation = { createCowSchema ,updateCowSchema};
