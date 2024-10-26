import { Router } from "express";
import { CowController } from "./cow.controller";

const router = Router();

router.post("/", CowController.createCow);
router.get("/", CowController.getAllCows);
router.get("/:id", CowController.getSingleCow);
router.patch("/softdelete/:id", CowController.softDeleteCow);
router.delete("/:id", CowController.hardDeleteCow);

export const CowRoutes = router;
