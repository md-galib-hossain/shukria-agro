import { Router } from "express";
import { VaccineController } from "./vaccine.controller";
import validateRequest from "../../middlewares/validateRequest";
import { VaccineValidation } from "./vaccine.validation";

const router = Router();

router.post("/",validateRequest(VaccineValidation.createVaccineSchema), VaccineController.createVaccine);
router.patch("/:id",validateRequest(VaccineValidation.updateVaccineSchema), VaccineController.updateVaccine);
router.get("/", VaccineController.getAllVaccines);
router.get("/:id", VaccineController.getSingleVaccine);
router.patch("/softdelete/:id", VaccineController.softDeleteVaccine);
router.delete("/:id", VaccineController.hardDeleteVaccine);

export const VaccineRoutes = router;