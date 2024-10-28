import { Router } from "express";
import { CowController } from "./cow.controller";
import validateRequest from "../../middlewares/validateRequest";
import { CowValidation, softDeleteSchema } from "./cow.validation";

const router = Router();

router.post("/",validateRequest(CowValidation.createCowSchema), CowController.createCow);
router.patch("/:id",validateRequest(CowValidation.updateCowSchema), CowController.updateCow);
router.get("/", CowController.getAllCows);
router.get("/:id", CowController.getSingleCow);
router.patch("/softdelete/:id",validateRequest(softDeleteSchema), CowController.softDeleteCow);
router.delete("/:id", CowController.hardDeleteCow);

export const CowRoutes = router;
