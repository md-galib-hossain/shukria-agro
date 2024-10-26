import { Router } from "express";
import { LactationController } from "./lactation.controller";

const router = Router();

router.post("/", LactationController.createLactation);
router.get("/", LactationController.getAllLactations);
router.get("/:id", LactationController.getSingleLactation);
router.patch("/softdelete/:id", LactationController.softDeleteLactation);
router.delete("/:id", LactationController.hardDeleteLactation);

export const LactationRoutes = router;
