import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { PregnancyService } from "./pregnancy.service";
import httpStatus from "http-status";

const createPregnancy = catchAsync(async (req: Request, res: Response) => {
  const result = await PregnancyService.createPregnancy(req.body);
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "Pregnancy record created",
    data: result,
  });
});

const getAllPregnancies = catchAsync(async (req: Request, res: Response) => {
  const result = await PregnancyService.getAllPregnancies();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Pregnancy records retrieved successfully",
    data: result,
  });
});

const getSinglePregnancy = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await PregnancyService.getSinglePregnancy(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Pregnancy record retrieved successfully",
    data: result,
  });
});

const softDeletePregnancy = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  await PregnancyService.softDeletePregnancy(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Pregnancy record soft-deleted successfully",
    data: null,
  });
});

const hardDeletePregnancy = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  await PregnancyService.hardDeletePregnancy(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Pregnancy record permanently deleted",
    data: null,
  });
});

export const PregnancyController = {
  createPregnancy,
  getAllPregnancies,
  getSinglePregnancy,
  softDeletePregnancy,
  hardDeletePregnancy,
};
