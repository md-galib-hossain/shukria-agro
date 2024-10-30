import { Router } from "express";
import { MilkRecordController } from "./milkrecord.controller"; 
import validateRequest from "../../middlewares/validateRequest";
import { MilkValidation } from "./milkrecord.validation"; 

const router = Router();

router.post("/", validateRequest(MilkValidation.createMilkRecordSchema), MilkRecordController.createMilkRecord);
router.patch("/:id", validateRequest(MilkValidation.updateMilkRecordSchema), MilkRecordController.updateMilkRecord);
router.get("/", MilkRecordController.getAllMilkRecords);
router.get("/:id", MilkRecordController.getSingleMilkRecord);
router.patch("/softdelete/:id", MilkRecordController.softDeleteMilkRecord);
router.delete("/:id", MilkRecordController.hardDeleteMilkRecord);

export const MilkRecordRoutes = router;
