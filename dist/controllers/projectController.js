var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { PrismaClient } from "@prisma/client";
import httpStatus from "../helpers/httpStatus";
import { formatResponse } from "../utils/formatResponse";
const prisma = new PrismaClient();
export const projectController = () => {
    const createProject = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        //Destructuramos los datos que vienen en el body
        const { name, description, status, developers } = req.body;
        try {
            // Creamos el proyecto
            const project = yield prisma.project.create({
                data: {
                    name,
                    description,
                    status,
                    developers: developers && {
                        create: developers.map((dev) => ({
                            devId: dev.devId,
                        })),
                    },
                },
            });
            res
                .status(httpStatus.CREATED)
                .json(formatResponse(project, "Project created successfully"));
        }
        catch (error) {
            next(error);
        }
        finally {
            yield prisma.$disconnect();
        }
    });
    const getAllProject = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const projects = yield prisma.project.findMany({
                include: {
                    developers: true, // Incluimos los datos de desarrolladores
                },
            });
            res
                .status(httpStatus.OK)
                .json(formatResponse(projects, "Projects retrieved successfully"));
        }
        catch (error) {
            next(error);
        }
        finally {
            yield prisma.$disconnect();
        }
    });
    const getProjectById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        // Destructuramos el id del proyecto
        const { id } = req.params;
        try {
            const project = yield prisma.project.findUnique({
                where: {
                    id: Number(id),
                },
                include: {
                    developers: true, // Incluimos los datos de desarrolladores
                },
            });
            res
                .status(httpStatus.OK)
                .json(formatResponse(project, "Project retrieved successfully"));
        }
        catch (error) {
            next(error);
        }
        finally {
            yield prisma.$disconnect();
        }
    });
    const deleteProject = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        const { id } = req.params;
        try {
            const project = yield prisma.project.delete({
                where: {
                    id: Number(id),
                },
            });
            res
                .status(httpStatus.OK)
                .json(formatResponse(project, "Project deleted successfully"));
        }
        catch (error) {
            next(error);
        }
        finally {
            yield prisma.$disconnect();
        }
    });
    const updateProject = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        const { id } = req.params;
        const { name, description, status, developers } = req.body;
        try {
            const project = yield prisma.project.update({
                where: {
                    id: Number(id),
                },
                data: {
                    name,
                    description,
                    status,
                    developers: developers && {
                        create: developers.map((dev) => ({
                            devId: dev.devId,
                        })),
                    },
                },
            });
            res
                .status(httpStatus.OK)
                .json(formatResponse(project, "Project updated successfully"));
        }
        catch (error) {
            next(error);
        }
        finally {
            yield prisma.$disconnect();
        }
    });
    return {
        createProject,
        getAllProject,
        getProjectById,
        deleteProject,
        updateProject,
    };
};
