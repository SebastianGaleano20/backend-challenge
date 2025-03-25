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
    const { name, description, status } = req.body;
    try {
      const project = await prisma.project.create({
        data: {
          name,
          description,
          status,
        },
      });

      const responseFormat = {
        data: project,
        message: "Project Created Succesfully",
      };

      return res.status(httpStatus.OK).json(responseFormat);
    } catch (error) {
      next(error);
    } finally {
      await prisma.$disconnect();
    }
  };
};
