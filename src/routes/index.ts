import { Application } from "express";
import userRoutes from "./user.routes";
import authRoutes from "./auth.routes";
import listRoutes from "./list.routes";
import faqRoutes from "./faq.routes";
import adminRoutes from "./admin/admin.routes";

const registerRoutes = (app: Application) => {
  app.use("/users", userRoutes);
  app.use("/auth", authRoutes);
  app.use("/lists", listRoutes);
  app.use("/faqs", faqRoutes);
  app.use("/__admin302", adminRoutes);
};

export default registerRoutes;
