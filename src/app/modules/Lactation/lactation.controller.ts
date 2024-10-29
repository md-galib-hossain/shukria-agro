import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { LactationService } from "./lactation.service";
import httpStatus from "http-status";

const createLactation = catchAsync(async (req: Request, res: Response) => {
  const result = await LactationService.createLactation(req.body);
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "Lactation record created",
    data: result,
  });
});

const getAllLactations = catchAsync(async (req: Request, res: Response) => {
  const result = await LactationService.getAllLactations();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Lactation records retrieved",
    data: result,
  });
});

const getSingleLactation = catchAsync(async (req: Request, res: Response) => {
  const result = await LactationService.getSingleLactation(req.params.id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Lactation record retrieved",
    data: result,
  });
});

const softDeleteLactation = catchAsync(async (req: Request, res: Response) => {
  await LactationService.softDeleteLactation(req.params.id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Lactation record soft deleted",
    data: null,
  });
});

const hardDeleteLactation = catchAsync(async (req: Request, res: Response) => {
  await LactationService.hardDeleteLactation(req.params.id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Lactation record permanently deleted",
    data: null,
  });
});
const updateLactation = catchAsync(async (req: Request, res: Response) => {
  const {id} = req.params
 const result = await LactationService.updateLactation(id,req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Lactation record updated",
    data: result,
  });
});

export const LactationController = {
  createLactation,
  getAllLactations,
  getSingleLactation,
  softDeleteLactation,
  hardDeleteLactation,updateLactation
};
