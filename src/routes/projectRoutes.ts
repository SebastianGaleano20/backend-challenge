import { Router } from "express";
import { projectController } from "@/controllers/projectController";
import { schemaValidator } from "@/middlewares/schemaValidator";
import { projectSchema } from "@/schemas/projectsSchema";

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
