import { Router } from "express";
import { projectController } from "../controllers/projectController.js";
import { schemaValidator } from "../middlewares/schemaValidator.js";
import { projectSchema } from "../schemas/projectsSchema.js";

export const projectRouter = () => {
  const projectRouter = Router();
  const {
    getAllProject,
    getProjectById,
    createProject,
    deleteProject,
    updateProject,
  } = projectController();

  projectRouter
    .route("/projects")
    .get(getAllProject)
    .post(schemaValidator(projectSchema), createProject);

  projectRouter
    .route("/projects/:id")
    .get(getProjectById)
    .delete(deleteProject)
    .patch(schemaValidator(projectSchema), updateProject);

  return projectRouter;
};
