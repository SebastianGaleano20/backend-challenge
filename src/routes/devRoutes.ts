import { Router } from "express";
import { devController } from "../controllers/devController.js";
import { schemaValidator } from "../middlewares/schemaValidator.js";
import { devSchema } from "../schemas/devSchema.js";

export const devRouter = () => {
  const devRouter = Router();
  const { createDev, getAllDev } = devController();
  devRouter
    .route("/dev")
    .get(getAllDev)
    .post(schemaValidator(devSchema), createDev);
  return devRouter;
};
