import pkg from '@prisma/client';
import createHttpError from 'http-errors';
import { STATUS } from '../../constant/ENUM.js';

const { PrismaClient } = pkg;
const prisma = new PrismaClient();

const createRejectReason = async (req, res) => {
    try {
        const { id } = req.params;
        const { description } = req.body;
        const data = await prisma.bookingRejectFeedBack.findUnique({
            where: {
                bookingId: id
            }
        })

        const booking = await prisma.booking.findUnique({
            where: {
                id: id
            }
        })

        if (!booking) {
            return res.status(401).json({ message: 'No data' })
        }

        if (data) {
            return res.status(401).json({ message: 'Feedback exist' })
        } else {

            if (booking.status !== STATUS.reject) {
                return res.status(401).json({ message: 'Not correct status' })
            }

            await prisma.bookingRejectFeedBack.create({
                data: {
                    description: description,
                    booking: {
                        connect: {
                            id: id
                        }
                    }
                }
            })

            return res.status(200).json({ message: 'Create feedback successfully' })
        }
    } catch (error) {
        // eslint-disable-next-line no-console
        console.log(error);
        // 500 (Internal Server Error) - Something has gone wrong in your application.
        const httpError = createHttpError(500, error);
        return res.status(500).json({ message: httpError });
    }
}

export const feedback = {
    createRejectReason
}