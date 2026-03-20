import { Router } from "express";
import { verifyUserRoles } from "../../middlewares/routesMiddleware";
import { adminController } from "../../controllers/admin/admin.controller";

const router = Router();

router.get(
  "/relatorios",
  verifyUserRoles(["ADMIN", "MANAGER"]),
  adminController.total,
);
router.patch(
  "/accstatus/:id",
  verifyUserRoles(["ADMIN", "MANAGER"]),
  adminController.accountStatus,
);
router.post("/register", verifyUserRoles(["ADMIN"]), adminController.create);

export default router;
