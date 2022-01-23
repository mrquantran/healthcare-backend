/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
import pkg from '@prisma/client';
import createHttpError from 'http-errors';
import { FORMAT_DATE, STATUS } from '../../constant/ENUM.js';
import { getDecodedToken } from '../../helpers/auth.helper.js';
import moment from 'moment'
import { TYPE_USER } from './../../constant/ENUM.js';

const { PrismaClient } = pkg;
const prisma = new PrismaClient();

const getClinics = async (req, res) => {
    try {
        const data = await prisma.clinic.findMany({});

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

const getClinic = async (req, res) => {
    try {
        const { id } = req.params;
        const data = await prisma.clinic.findUnique({
            where: {
                id
            }
        });

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

const createClinic = async (req, res) => {
    try {
        const { no, name, address, district, workHours, city, email } = req.body

        // const token = await getDecodedToken(req);


        const data = await prisma.clinic.create({
            data: {
                no,
                name,
                address,
                district,
                workHours,
                city,
                email,
                // user: {
                //     connect: {
                //         email,
                //     }
                // },
            }
        })

        return res.status(200).json(data)
    } catch (error) {
        // eslint-disable-next-line no-console
        console.log(error);
        // 500 (Internal Server Error) - Something has gone wrong in your application.
        const httpError = createHttpError(500, error);
        return res.status(500).json({ message: httpError });
    }
}

const deleteClinic = async (req, res) => {
    try {
        const { id } = req.params

        const data = await prisma.clinic.findUnique({
            where: {
                id
            },
        })

        if (!data) {
            res.status(401).json({ message: 'No clinic found' })
        } else {

            await prisma.clinic.delete({
                where: {
                    id
                }
            })
            return res.status(200).json({ message: 'Delete the clinic successfully' })
        }

    } catch (error) {
        // eslint-disable-next-line no-console
        console.log(error);
        // 500 (Internal Server Error) - Something has gone wrong in your application.
        const httpError = createHttpError(500, error);
        return res.status(500).json({ message: httpError });
    }
}

const updateClinic = async (req, res) => {
    try {

        const { name, address, district, workHours, city } = req.body

        const data = await prisma.clinic.update({
            where: {
                id: req.params.id,
            },
            data: {
                name,
                address,
                district,
                workHours,
                city,
            }
        })

        return res.status(200).json({
            message: 'Update the clinic successfully',
            data
        });

    } catch (error) {
        // eslint-disable-next-line no-console
        console.log(error);
        // 500 (Internal Server Error) - Something has gone wrong in your application.
        const httpError = createHttpError(500, error);
        return res.status(500).json({ message: httpError });
    }
}

export const clinicController = {
    getClinics, getClinic, deleteClinic, createClinic, updateClinic
}



