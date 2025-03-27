import { Router } from "express";
import { projectController } from "../controllers/projectController";

export const projectRouter = () => {
    const projectRouter = Router();
    const { getAllProject, getProjectById, createProject, deleteProject, updateProject } = projectController();

    projectRouter.route('/projects')
        .get(getAllProject)
        .post(createProject)

    projectRouter.route('/projects/:id')
        .get(getProjectById)
        .delete(deleteProject)
        .patch(updateProject)

    return projectRouter;
}