import { z } from "zod";
import { cowSex } from "./cow.constant";

const vaccinationSchema = z.object({
  vaccineId: z.string({ required_error: "Vaccine ID is required" }).min(1),
  vaccinatedDate: z.date({ required_error: "Vaccinated date is required" }),
  nextVaccinationDate: z.date().optional(),
});

const createCowSchema = z.object({
  body: z.object({
    name: z.string().optional(),
    cowId: z.string().optional(),
    dateOfBirth: z.date({ required_error: "Date of birth is required" }),
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

export const softDeleteSchema= z.object({
    body:z.object({
        isDeleted: z.boolean().optional(),
    })
})

export const CowValidation = { createCowSchema };
