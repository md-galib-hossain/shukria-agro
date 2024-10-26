import { Router } from "express";
import { VaccineController } from "./vaccine.controller";

const router = Router();

router.post("/", VaccineController.createVaccine);
router.get("/", VaccineController.getAllVaccines);
router.get("/:id", VaccineController.getSingleVaccine);
router.patch("/softdelete/:id", VaccineController.softDeleteVaccine);
router.delete("/:id", VaccineController.hardDeleteVaccine);

export const VaccineRoutes = router;
