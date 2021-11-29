import pkg from '@prisma/client';
import createHttpError from 'http-errors';

const { PrismaClient } = pkg;
const prisma = new PrismaClient();

const getCategoryOptions = async (req, res) => {
    try {
        const data = await prisma.categories.findMany({
            select: {
                id: true,
                title: true,
                description: true,
            }
        })

        if (data) {
            return res.status(200).json(data)
        }
    } catch (error) {
        // eslint-disable-next-line no-console
        console.log(error);
        // 500 (Internal Server Error) - Something has gone wrong in your application.
        const httpError = createHttpError(500, error);
        return res.status(500).json({ message: httpError });
    }
}

const createCategory = async (req, res) => {
    try {
        const { title } = req.body
        const data = await prisma.categories.create({
            data: {
                title: title,
                description: 'Description of category'
            }
        })

        if (data) {
            return res.status(200).json(data)
        }
    } catch (error) {
        // eslint-disable-next-line no-console
        console.log(error);
        // 500 (Internal Server Error) - Something has gone wrong in your application.
        const httpError = createHttpError(500, error);
        return res.status(500).json({ message: httpError });
    }
}


export const categories = {
    getCategoryOptions, createCategory
}