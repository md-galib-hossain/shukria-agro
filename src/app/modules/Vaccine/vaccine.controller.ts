import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { VaccineService } from "./vaccine.service";
import httpStatus from "http-status";

const createVaccine = catchAsync(async (req: Request, res: Response) => {
  const result = await VaccineService.createVaccine(req.body);
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "Vaccine created successfully",
    data: result,
  });
});

const getAllVaccines = catchAsync(async (req: Request, res: Response) => {
  const data = await VaccineService.getAllVaccines(req.query);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Vaccines retrieved successfully",
    data: data.result,
    meta: data.meta,
  });
});

const getSingleVaccine = catchAsync(async (req: Request, res: Response) => {
  const result = await VaccineService.getSingleVaccine(req.params.id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Vaccine retrieved successfully",
    data: result,
  });
});

const softDeleteVaccine = catchAsync(async (req: Request, res: Response) => {
  const result = await VaccineService.softDeleteVaccine(req.params.id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Vaccine soft deleted successfully",
    data: result,
  });
});

const hardDeleteVaccine = catchAsync(async (req: Request, res: Response) => {
  const result = await VaccineService.hardDeleteVaccine(req.params.id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Vaccine hard deleted successfully",
    data: result,
  });
});

const updateVaccine = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await VaccineService.updateVaccine(id, req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Vaccine updated successfully",
    data: result,
  });
});

export const VaccineController = {
  createVaccine,
  getAllVaccines,
  getSingleVaccine,
  softDeleteVaccine,
  hardDeleteVaccine,updateVaccine
};
