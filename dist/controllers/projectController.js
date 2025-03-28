"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.projectController = void 0;
const client_1 = require("@prisma/client");
const httpStatus_1 = __importDefault(require("../helpers/httpStatus"));
const formatResponse_1 = require("../utils/formatResponse");
const prisma = new client_1.PrismaClient();
const projectController = () => {
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
            res.status(httpStatus_1.default.CREATED).json((0, formatResponse_1.formatResponse)(project, "Project created successfully"));
        }
        catch (error) {
            next(error);
        }
        finally {
            yield prisma.$disconnect();
        }
    });
    const getAllProject = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        var _a;
        // Destructuramos query para obtener el nombre del proyecto
        const { query } = req;
        try {
            // Buscamos el proyecto por nombre o devolvemos todos sus valores
            const projects = yield prisma.project.findMany({
                where: {
                    name: {
                        contains: (_a = query === null || query === void 0 ? void 0 : query.productName) !== null && _a !== void 0 ? _a : ''
                    },
                },
                include: {
                    developers: true, // Incluimos los datos de desarrolladores
                },
            });
            res.status(httpStatus_1.default.OK).json((0, formatResponse_1.formatResponse)(projects, "Projects retrieved successfully"));
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
            res.status(httpStatus_1.default.OK).json((0, formatResponse_1.formatResponse)(project, "Project retrieved successfully"));
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
            res.status(httpStatus_1.default.OK).json((0, formatResponse_1.formatResponse)(project, "Project deleted successfully"));
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
            res.status(httpStatus_1.default.OK).json((0, formatResponse_1.formatResponse)(project, "Project updated successfully"));
        }
        catch (error) {
            next(error);
        }
        finally {
            yield prisma.$disconnect();
        }
        ;
    });
    return {
        createProject,
        getAllProject,
        getProjectById,
        deleteProject,
        updateProject
    };
};
exports.projectController = projectController;
