import { Router } from "express";
import { CategoryController } from "./category.controller";
import validateRequest from "../../middlewares/validateRequest";
import { CategoryValidation } from "./category.validation";

const router = Router();
router.post(
  "/",
  validateRequest(CategoryValidation.createCategorySchema),
  CategoryController.createCategory
);
router.get("/", CategoryController.getAllCategories);
router.get("/", CategoryController.getSingleCategory);
router.patch(
  "/softdelete/:id",

  CategoryController.softDeleteCategory
);
router.patch(
  "/:id",
  validateRequest(CategoryValidation.updateCategorySchema),
  CategoryController.updateCategory
);
router.delete("/:id", CategoryController.hardDeleteCategory);

export const CategoryRoutes = router;
