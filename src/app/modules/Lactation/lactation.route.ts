import { Router } from "express";
import { LactationController } from "./lactation.controller";
import validateRequest from "../../middlewares/validateRequest";
import { LactationValidation } from "./lactation.validation";

const router = Router();

router.post("/", validateRequest(LactationValidation.createLactationSchema),LactationController.createLactation);
router.patch("/:id", validateRequest(LactationValidation.updateLactationSchema),LactationController.updateLactation);
router.get("/", LactationController.getAllLactations);
router.get("/:id", LactationController.getSingleLactation);
router.patch("/softdelete/:id",LactationController.softDeleteLactation);
router.delete("/:id", LactationController.hardDeleteLactation);

export const LactationRoutes = router;
