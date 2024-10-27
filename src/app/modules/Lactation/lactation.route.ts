import { Router } from "express";
import { LactationController } from "./lactation.controller";
import validateRequest from "../../middlewares/validateRequest";
import { LactationValidation } from "./lactation.validation";
import { softDeleteSchema } from "../Cow/cow.validation";

const router = Router();

router.post("/", validateRequest(LactationValidation.createLactationSchema),LactationController.createLactation);
router.get("/", LactationController.getAllLactations);
router.get("/:id", LactationController.getSingleLactation);
router.patch("/softdelete/:id", validateRequest(softDeleteSchema),LactationController.softDeleteLactation);
router.delete("/:id", LactationController.hardDeleteLactation);

export const LactationRoutes = router;
