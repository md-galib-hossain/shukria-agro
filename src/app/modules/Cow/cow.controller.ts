import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { CowService } from "./cow.service";
import httpStatus from "http-status";

const createCow = catchAsync(async (req, res) => {
  console.log(req.body);
  const result = await CowService.createCow(req.body);
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "Cow created successfully",
    data: result,
  });
});
const updateCow = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await CowService.updateCow(id, req.body);
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "Cow updated successfully",
    data: result,
  });
});

const getAllCows = catchAsync(async (req, res) => {
  const data = await CowService.getAllCowsWithQuery(req.query);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "All cows retrieved successfully",
    data: data.result,
    meta: data.meta,
  });
});
const getAllCowsStats = catchAsync(async (req, res) => {
  const data = await CowService.getAllCowsStats();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Stats retrieved successfully",
    data: data,
  });
});

const getAllCowsWithoutSpecific = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await CowService.getAllCowsExcludingId(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "All cows retrieved successfully",
    data: result,
  });
});

const getSingleCow = catchAsync(async (req, res) => {
  const result = await CowService.getSingleCow(req.params.id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Cow retrieved successfully",
    data: result,
  });
});

const softDeleteCow = catchAsync(async (req, res) => {
  await CowService.softDeleteCow(req.params.id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Cow soft-deleted successfully",
    data: null,
  });
});

const hardDeleteCow = catchAsync(async (req, res) => {
  await CowService.hardDeleteCow(req.params.id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Cow permanently deleted successfully",
    data: null,
  });
});

export const CowController = {
  createCow,
  getAllCows,
  getSingleCow,
  softDeleteCow,
  hardDeleteCow,
  updateCow,
  getAllCowsWithoutSpecific,getAllCowsStats
};
