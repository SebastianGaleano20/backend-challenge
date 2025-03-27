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
    const { name, description, status, developers } = req.body;
    try {
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
      const responseFormat = {
        data: project,
        message: "Project created successfully",
        status: httpStatus.CREATED
      };

      return res
        .status(httpStatus.CREATED)
        .json(responseFormat);
    } catch (error) {
      next(error);
    }
  };

  return {
    createProject,
  };
};
