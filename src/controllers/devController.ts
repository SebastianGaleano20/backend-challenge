import { PrismaClient } from "@prisma/client";
import httpStatus from "@/helpers/httpStatus";
import { Response, Request, NextFunction } from "express";
import { formatResponse } from "@/utils/formatResponse";

const prisma = new PrismaClient();

export const devController = () => {
  const createDev = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    const { name, email, image, role } = req.body;
    try {
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
  const getAllDev = async (req: Request, res: Response, next: NextFunction) => {
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

  return { createDev };
};
