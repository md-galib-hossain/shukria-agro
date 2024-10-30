import { Router } from "express";
import { PregnancyController } from "./pregnancy.controller";
import validateRequest from "../../middlewares/validateRequest";
import { PregnancyValidation } from "./pregnancy.validation";

const router = Router();

router.post(
  "/",
  validateRequest(PregnancyValidation.createPregnancySchema),
  PregnancyController.createPregnancy
);
router.patch(
  "/:id",
  validateRequest(PregnancyValidation.updatedPregnancySchema),
  PregnancyController.createPregnancy
);
router.get("/", PregnancyController.getAllPregnancies);
router.get("/:id", PregnancyController.getSinglePregnancy);
router.patch(
  "/softdelete/:id",

  PregnancyController.softDeletePregnancy
);
router.delete("/:id", PregnancyController.hardDeletePregnancy);

export const PregnancyRoutes = router;
