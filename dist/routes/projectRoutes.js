"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.projectRouter = void 0;
const express_1 = require("express");
const projectController_1 = require("../controllers/projectController");
const schemaValidator_1 = require("../middlewares/schemaValidator");
const projectsSchema_1 = require("../schemas/projectsSchema");
const projectRouter = () => {
    const projectRouter = (0, express_1.Router)();
    const { getAllProject, getProjectById, createProject, deleteProject, updateProject } = (0, projectController_1.projectController)();
    projectRouter.route('/projects')
        .get(getAllProject)
        .post((0, schemaValidator_1.schemaValidator)(projectsSchema_1.projectSchema), createProject);
    projectRouter.route('/projects/:id')
        .get(getProjectById)
        .delete(deleteProject)
        .patch(updateProject);
    return projectRouter;
};
exports.projectRouter = projectRouter;
