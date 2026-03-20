import { Router } from "express";
import { checkPlan, verifyUserRoles } from "../middlewares/routesMiddleware";
import multer from "multer";
import multerConfig from "../middlewares/multerConfig";
import { listController } from "../controllers/list.controller";

const upload = multer({
  storage: multerConfig.storage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter(_, file, cb) {
    if (file.mimetype.startsWith("image/")) {
      cb(null, true);
    } else {
      cb(null, false);
    }
  },
});

const router = Router();

router.post(
  "/",
  verifyUserRoles(["OWNER"]),
  checkPlan(),
  upload.single("foto"),
  listController.create,
);

router.get("/", verifyUserRoles(["OWNER"]), listController.my);
router.get("/:token", listController.search);
router.patch("/:id", listController.upstatus);

export default router;
