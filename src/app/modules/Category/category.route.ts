import { Router } from "express";
import { CategoryController } from "./category.controller";

const router = Router();
router.post("/", CategoryController.createCategory);
router.get("/", CategoryController.getAllCategories);
router.get("/", CategoryController.getSingleCategory);
router.patch("/softdelete/:id", CategoryController.softDeleteCategory);
router.delete("/:id", CategoryController.hardDeleteCategory);

export const CategoryRoutes = router