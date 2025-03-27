import { Router } from "express";
import { projectController } from "../controllers/projectController";
import swaggerUi from "swagger-ui-express";
import swaggerJsdoc from "swagger-jsdoc";

export const projectRouter = () => {
    const projectRouter = Router();
    const { getAllProject, getProjectById, createProject, deleteProject } = projectController();

    projectRouter.route('/projects')
    .get(getAllProject)
    .post(createProject)
    
}