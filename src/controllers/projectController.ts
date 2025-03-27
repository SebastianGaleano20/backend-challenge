import { PrismaClient } from "@prisma/client";
import { Response, Request, NextFunction } from "express";
import httpStatus from "../helpers/httpStatus";

const prisma = new PrismaClient();

export const projectController = () => {
  const createProject = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    //Destructuramos los datos que vienen en el body
    const { name, description, status, developers } = req.body;
    try {
      // Creamos el proyecto
      const project = await prisma.project.create({
        data: {
          name,
          description,
          status,
          developers: developers && {
            create: developers.map((dev: { devId: number }) => ({
              devId: dev.devId,
            })),
          },
        },
      });
      // Formato de respuesta para el cliente
      const responseFormat = {
        data: project,
        message: "Project created successfully",
        status: httpStatus.CREATED
      };

      return res.status(httpStatus.CREATED).json(responseFormat);
    } catch (error) {
      next(error);
    } finally {
      await prisma.$disconnect();
    }
  };

  const getAllProject = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    // Destructuramos query para obtener el nombre del proyecto
    const { query } = req;
    try {
      // Buscamos el proyecto por nombre o devolvemos todos sus valores
      const projects = await prisma.project.findMany({
        where: {
          name: {
            contains: query.name,
          },
        },
        include: {
          developers: true, // Incluimos los datos de desarrolladores
        },
      });

      // Formato de respuesta para el cliente
      const responseFormat = {
        data: projects,
        message: "Projects retrieved successfully",
        status: httpStatus.OK
      };

      return res.status(httpStatus.OK).json(responseFormat);
    } catch (error) {
      next(error);
    } finally {
      await prisma.$disconnect();
    }
  }

  const getProjectById = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    // Destructuramos el id del proyecto
    const { id } = req.params;
    try {
      const project = await prisma.project.findUnique({
        where: {
          id: Number(id),
        },
        include: {
          developers: true, // Incluimos los datos de desarrolladores
        },
      });

      // Formato de respuesta para el cliente
      const responseFormat = {
        data: project,
        message: "Project retrieved successfully",
        status: httpStatus.OK
      };

      return res.status(httpStatus.OK).json(responseFormat)
    } catch (error) {
      next(error);
    } finally {
      await prisma.$disconnect();
    }
  }

  const deleteProject = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const { id } = req.params;
    try {
      const project = await prisma.project.delete({
        where: {
          id: Number(id),
        },
      });

      const responseFormat = {
        data: project,
        message: "Project deleted successfully",
        status: httpStatus.OK
      };

      return res.status(httpStatus.OK).json(responseFormat);
    } catch (error) {
      next(error);
    } finally {
      await prisma.$disconnect();
    }
  }

  return {
    createProject,
    getAllProject,
    getProjectById,
    deleteProject
  };
};
