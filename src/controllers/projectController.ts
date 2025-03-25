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

      return res
        .status(httpStatus.CREATED)
        .json({ data: project, message: "Project created successfully" });
    } catch (error) {
      next(error);
    }
  };

  return {
    createProject,
  };
};
