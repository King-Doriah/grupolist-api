import { Router } from "express";
import { faqController } from "../controllers/faq.controller";
import { verifyUserRoles } from "../middlewares/routesMiddleware";

const router = Router();

router.post("/", verifyUserRoles(["ADMIN"]), faqController.create);
router.get("/", faqController.list);

export default router;
