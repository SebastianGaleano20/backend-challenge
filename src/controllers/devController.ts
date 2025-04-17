import { PrismaClient } from "@prisma/client";
import httpStatus from "../helpers/httpStatus.js";
import { Response, Request, NextFunction } from "express";
import { formatResponse } from "../utils/formatResponse.js";
// Iniciamos prismaClient
const prisma = new PrismaClient();

export const devController = () => {
  // Servicio para crear Desarrollador
  const createDev = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    // Destructuramos los datos que vienen en el body
    const { name, email, image, role } = req.body;
    try {
      // Creamos el desarrollador con el metodo create de prisma
      const developer = await prisma.developer.create({
        data: {
          name,
          email,
          image,
          role,
        },
      });
      res
        .status(httpStatus.CREATED)
        .json(formatResponse(developer, "Developer created successfully"));
    } catch (error) {
      next(error);
    } finally {
      await prisma.$disconnect();
    }
  };
  const getAllDev = async (
    _req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const developers = await prisma.developer.findMany();
      res
        .status(httpStatus.OK)
        .json(formatResponse(developers, "Developers retrieved successfully"));
    } catch (error) {
      next(error);
    } finally {
      await prisma.$disconnect();
    }
  };

  return { createDev, getAllDev };
};
