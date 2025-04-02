import { Router } from "express";
import { devController } from "@/controllers/devController";

export const devRouter = () => {
  const devRouter = Router();
  const { createDev } = devController();
  devRouter.route("/dev").post(createDev);
};
