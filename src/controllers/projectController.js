import HTTP_STATUS from '../helpers/httpStatus.js';
import { createProjectSchema, updateProjectSchema } from '../schemas/usersSchema.js';
import PrismaClient from '../config/prisma.js';

const prisma = new PrismaClient();


const projectController = () => { 
    const getProjects = async (req,res, next) => {
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
        } finally{
            await prisma.$disconnect();
        }
    }

    return {
        getProjects,
    }
}

export default projectController;