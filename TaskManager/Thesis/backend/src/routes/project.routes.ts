import { Router } from "express";
import { projectController } from "../controllers/project.controller";
import authMiddleware from "../middlewares/authMiddleware";

const router = Router();

router.get("/all", authMiddleware, projectController.getAllProjects);
router.get("/:id", authMiddleware, projectController.getProject);
router.get("/:id/tasks", authMiddleware, projectController.getProjectTasks);
router.post("/", authMiddleware, projectController.createUpdateProject);
router.delete("/:id", authMiddleware, projectController.deleteProject);

export default router;
