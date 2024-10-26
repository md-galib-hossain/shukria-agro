import { Router } from "express";
import { PregnancyController } from "./pregnancy.controller";

const router = Router();

router.post("/", PregnancyController.createPregnancy);
router.get("/", PregnancyController.getAllPregnancies);
router.get("/:id", PregnancyController.getSinglePregnancy);
router.patch("/softdelete/:id", PregnancyController.softDeletePregnancy);
router.delete("/:id", PregnancyController.hardDeletePregnancy);

export const PregnancyRoutes = router;
