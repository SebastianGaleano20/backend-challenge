import { PrismaClient } from "@prisma/client";
import { Response, Request, NextFunction } from "express";
import httpStatus from "../helpers/httpStatus.js";
import { formatResponse } from "../utils/formatResponse.js";

const prisma = new PrismaClient();

export const projectController = () => {
  const createProject = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    //Destructuramos los datos que vienen en el body
    const { name, description, status, developers } = req.body;
    try {
      // Creamos el proyecto con el metodo create de prisma
      const project = await prisma.project.create({
        data: {
          name,
          description,
          status,
          developers: developers && {
            // Iteramos sobre los id de los devs para encontrarlos y asignarles el proyecto
            create: developers.map((dev: { devId: number }) => ({
              devId: dev.devId,
            })),
          },
        },
        include: {
          developers: {
            include: {
              developer: true, // extrae toda la info del Developer
            },
          },
        },
      });

      res
        .status(httpStatus.CREATED)
        .json(formatResponse(project, "Project created successfully"));
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
    try {
      const projects = await prisma.project.findMany({
        include: {
          developers: {
            include: {
              developer: true, // extrae toda la info del Developer
            },
          },
        },
      });

      res
        .status(httpStatus.OK)
        .json(formatResponse(projects, "Projects retrieved successfully"));
    } catch (error) {
      next(error);
    } finally {
      await prisma.$disconnect();
    }
  };

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
          developers: {
            include: {
              developer: true,
            },
          },
        },
      });

      res
        .status(httpStatus.OK)
        .json(formatResponse(project, "Project retrieved successfully"));
    } catch (error) {
      next(error);
    } finally {
      await prisma.$disconnect();
    }
  };

  const deleteProject = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    // Desestructuramos el id del proyecto
    const { id } = req.params;
    // id a entero para utilizar en where
    const projectId = Number(id);

    try {
      // Primero eliminamos las relaciones en ProjectDeveloper
      await prisma.projectDeveloper.deleteMany({
        where: { projectId },
      });

      // Ahora eliminamos el proyecto
      const project = await prisma.project.delete({
        where: { id: projectId },
      });

      res
        .status(httpStatus.OK)
        .json(formatResponse(project, "Project deleted successfully"));
    } catch (error) {
      next(error);
    } finally {
      await prisma.$disconnect();
    }
  };

  const updateProject = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const { id } = req.params;
    const { name, description, status, developers } = req.body;
    const projectId = Number(id);

    try {
      console.log(`Trying to update/create project with ID: ${projectId}`);

      // Actualizar o crear el proyecto si no existe
      const updatedProject = await prisma.project.upsert({
        where: {
          id: projectId,
        },
        update: {
          name,
          description,
          status,
        },
        create: {
          id: projectId,
          name: name || "Default name",
          description: description || null,
          status: status || "IN_PROGRESS",
        },
      });

      // Manejar desarrolladores si existen
      if (developers && Array.isArray(developers)) {
        // Eliminar relaciones existentes
        await prisma.projectDeveloper.deleteMany({
          where: {
            projectId,
          },
        });

        // Crear nuevas relaciones
        for (const dev of developers) {
          await prisma.projectDeveloper.create({
            data: {
              projectId,
              devId: dev.devId,
            },
          });
        }
      }

      // Obtener el proyecto actualizado con sus relaciones
      const finalProject = await prisma.project.findUnique({
        where: {
          id: projectId,
        },
        include: {
          developers: {
            include: {
              developer: true,
            },
          },
        },
      });

      res
        .status(httpStatus.OK)
        .json(formatResponse(finalProject, "Project updated successfully"));
    } catch (error) {
      console.error("Error updating/creating project:", error);
      next(error);
    } finally {
      await prisma.$disconnect();
    }
  };

  return {
    createProject,
    getAllProject,
    getProjectById,
    deleteProject,
    updateProject,
  };
};
