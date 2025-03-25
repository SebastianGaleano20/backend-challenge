import HTTP_STATUS from '../helpers/httpStatus.js';
import PrismaClient from '@prisma/client'

const prisma = new PrismaClient();


const projectController = () => {
    const getProjects = async (req, res, next) => {
        try {
            const projects = await prisma.project.findMany();
            const responseFormat = {
                data: projects,
                message: 'Projects fetched successfully',
                status: HTTP_STATUS.OK,
            }
            return res.status(HTTP_STATUS.OK).json(responseFormat);
        } catch (error) {
            next(error);
        } finally {
            await prisma.$disconnect();
        }
    }

    const createProject = async (req, res, next) => {
        const { name, description, status } = req.body;

        try {
            const project = await prisma.project.create({
                data: {
                    name,
                    description,
                    status,
                }
            });
            const responseFormat = {
                data: project,
                message: 'Project created successfully',
                status: HTTP_STATUS.CREATED,
            }
            return res.status(HTTP_STATUS.CREATED).json(responseFormat);

        } catch (error) {
            next(error);
        } finally {
            await prisma.$disconnect();
        }
    }

    const updateProject = async (req, res, next) => {
        const { name, description, status } = req.body;
        const { id } = req.params;

        try {
            const project = await prisma.project.update({
                where: {
                    id,
                },
                data: {
                    name,
                    description,
                    status,
                }
            });
            const responseFormat = {
                data: project,
                message: 'Project updated successfully',
                status: HTTP_STATUS.OK,
            }
            return res.status(HTTP_STATUS.OK).json(responseFormat);
        } catch (error) {
            next(error)
        } finally {
            await prisma.$disconnect();
        }
    }
    return {
        getProjects,
        createProject,
        updateProject
    }
}

export default projectController;