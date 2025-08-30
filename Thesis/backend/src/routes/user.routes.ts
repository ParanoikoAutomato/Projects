import { Router } from "express";
import { userController } from "../controllers/user.controller";
import authMiddleware from "../middlewares/authMiddleware";
import adminMiddleware from "../middlewares/adminMiddleware";

const router = Router();
router.get("/all", authMiddleware, userController.getAll);
router.post("/login", userController.loginUser);
router.post("/register", userController.registerUser);
router.post(
  "/change-role",
  authMiddleware,
  adminMiddleware,
  userController.changeUserRole
);
router.delete(
  "/:id",
  authMiddleware,
  adminMiddleware,
  userController.deleteUser
);

export default router;
