import { Router } from "express";
import { userController } from "../controllers/user.controller";
import { verifyUserRoles } from "../middlewares/routesMiddleware";
import { adminController } from "../controllers/admin/admin.controller";

const router = Router();

router.post("/", userController.create);
router.get("/me", verifyUserRoles(["OWNER"]), userController.me);
router.put(
  "/me/changePassword",
  verifyUserRoles(["OWNER", "ADMIN"]),
  userController.changePassword,
);
router.put("/:id/plan", verifyUserRoles(["ADMIN"]), adminController.updatePlan);

export default router;
