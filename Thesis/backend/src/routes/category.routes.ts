import { Router } from "express";

import { categoryController } from "../controllers/category.controller";
import authMiddleware from "../middlewares/authMiddleware";

const router = Router();

router.get("/all", authMiddleware, categoryController.getAll);
router.get("/:id", authMiddleware, categoryController.getCategory);
router.post("/", authMiddleware, categoryController.createUpdate);
router.delete("/:id", authMiddleware, categoryController.deleteCategory);

export default router;
