import { Router } from "express";
import { authController } from "../controllers/auth.controller";
import { verifyUserRoles } from "../middlewares/routesMiddleware";

const router = Router();

router.post("/", authController.login);
router.post("/refresh", authController.refresh);
router.post("/forgot-password", authController.forgotPassword);
router.post("/reset-password/:token", authController.resetPassword);
router.get(
  "/logout",
  verifyUserRoles(["ADMIN", "MANAGER", "OWNER"]),
  authController.logout,
);

export default router;
