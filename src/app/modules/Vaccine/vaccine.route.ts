import { Router } from "express";
import { VaccineController } from "./vaccine.controller";
import validateRequest from "../../middlewares/validateRequest";
import { VaccineValidation } from "./vaccine.validation";
import { softDeleteSchema } from "../Cow/cow.validation";

const router = Router();

router.post("/",validateRequest(VaccineValidation.createVaccineSchema), VaccineController.createVaccine);
router.get("/", VaccineController.getAllVaccines);
router.get("/:id", VaccineController.getSingleVaccine);
router.patch("/softdelete/:id", validateRequest(softDeleteSchema),VaccineController.softDeleteVaccine);
router.delete("/:id", VaccineController.hardDeleteVaccine);

export const VaccineRoutes = router;