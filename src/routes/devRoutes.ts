import { Router } from "express";
import { devController } from "../controllers/devController";
import { schemaValidator } from "../middlewares/schemaValidator";
import { devSchema } from "../schemas/devSchema";

export const devRouter = () => {
  const devRouter = Router();
  const { createDev, getAllDev } = devController();
  devRouter
    .route("/dev")
    .get(getAllDev)
    .post(schemaValidator(devSchema), createDev);
  return devRouter;
};
