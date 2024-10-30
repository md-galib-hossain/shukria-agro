import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { MilkRecordService } from "./milkrecord.service";
import httpStatus from "http-status";

const createMilkRecord = catchAsync(async (req, res) => {
  const result = await MilkRecordService.createMilkRecord(req.body);
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "Milk record created successfully",
    data: result,
  });
});

const updateMilkRecord = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await MilkRecordService.updateMilkRecord(id, req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Milk record updated successfully",
    data: result,
  });
});

const getAllMilkRecords = catchAsync(async (req, res) => {
  const data = await MilkRecordService.getAllMilkRecords(req.query);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "All milk records retrieved successfully",
    data: data.result,
    meta: data.meta,
  });
});

const getSingleMilkRecord = catchAsync(async (req, res) => {
  const result = await MilkRecordService.getSingleMilkRecord(req.params.id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Milk record retrieved successfully",
    data: result,
  });
});

const softDeleteMilkRecord = catchAsync(async (req, res) => {
  await MilkRecordService.softDeleteMilkRecord(req.params.id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Milk record soft-deleted successfully",
    data: null,
  });
});

const hardDeleteMilkRecord = catchAsync(async (req, res) => {
  await MilkRecordService.hardDeleteMilkRecord(req.params.id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Milk record permanently deleted successfully",
    data: null,
  });
});

export const MilkRecordController = {
  createMilkRecord,
  updateMilkRecord,
  getAllMilkRecords,
  getSingleMilkRecord,
  softDeleteMilkRecord,
  hardDeleteMilkRecord,
};
