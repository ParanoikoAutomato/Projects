import { Router } from "express";
import { taskController } from "../controllers/task.controller";
import authMiddleware from "../middlewares/authMiddleware";
import adminMiddleware from "../middlewares/adminMiddleware";

const router = Router();

router.get("/all", authMiddleware, taskController.getAllTasks);
router.get("/:id", authMiddleware, taskController.getTask);
router.get("/:id/history", authMiddleware, taskController.getTaskHistory);
router.post("/", authMiddleware, adminMiddleware, taskController.createUpdate);
router.post("/accept", authMiddleware, taskController.acceptTask);
router.post("/complete", authMiddleware, taskController.completeTask);
router.post("/approve", authMiddleware, taskController.approveTask);
router.post("/reject", authMiddleware, taskController.rejectTask);
router.post("/comment", authMiddleware, taskController.addTaskComment);
router.delete(
  "/:id",
  authMiddleware,
  adminMiddleware,
  taskController.deleteTask
);

export default router;
