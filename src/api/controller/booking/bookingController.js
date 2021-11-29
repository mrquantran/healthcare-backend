import pkg from '@prisma/client';
import createHttpError from 'http-errors';
import { FORMAT_DATE, STATUS } from '../../constant/ENUM.js';
import { getDecodedToken } from '../../helpers/auth.helper.js';
import moment from 'moment'
import { TYPE_USER } from './../../constant/ENUM.js';

const { PrismaClient } = pkg;
const prisma = new PrismaClient();

const paginatedData = (page = 1, perPage = 4, data) => {
    const startIndex = (page - 1) * perPage;
    const endIndex = page * perPage

    const newData = [...data].slice(startIndex, endIndex)
    return newData
}

const filterData = (filters = null, data) => {
    // if not have filters 
    if (!filters) {
        return data
    }

    const { page, perPage, ...rest } = filters

    const filteredData = data.filter(item => {
        let isValid = true;
        for (const key in rest) {
            isValid = isValid && item[key] == filters[key];
        }
        return isValid;
    });
    return filteredData
}

const getBookings = async (req, res) => {
    try {

        // handle pagination 
        const { page, perPage
        } = req.query

        const filter = req.query;

        const token = await getDecodedToken(req);

        let data;
        if (token.type === TYPE_USER.user) {
            data = await prisma.booking.findMany({
                where: {
                    user: {
                        email: token.email,
                    }
                },
                orderBy: [
                    { status: 'asc' },
                    { createdAt: 'desc' }
                ],
                select: {
                    id: true,
                    title: true,
                    place: true,
                    status: true,
                    category: {
                        select: {
                            category: {
                                select: {
                                    title: true,
                                }
                            }
                        }
                    },
                    user: {
                        select: {
                            email: true,
                        }
                    },
                    date: {
                        select: {
                            startDate: true,
                            isConfirm: true,
                        }
                    }

                }
            })
        } else if (token.type === TYPE_USER.admin) {
            data = await prisma.booking.findMany({
                orderBy: [
                    { status: 'desc' },
                    { createdAt: 'desc' }
                ],
                select: {
                    id: true,
                    title: true,
                    place: true,
                    status: true,
                    category: {
                        select: {
                            category: {
                                select: {
                                    title: true,
                                }
                            }
                        }
                    },
                    user: {
                        select: {
                            email: true,
                        }
                    },
                    date: {
                        select: {
                            id: true,
                            startDate: true,
                            isConfirm: true,
                            isActive: true,
                        }
                    }

                }
            })

            // change reject item to last index 
            const rejectItem = data.filter((item) => {
                return item.status === STATUS.reject
            })

            const restItem = data.filter((item) => {
                return item.status !== STATUS.reject
            })

            data = [...restItem, ...rejectItem]
        }

        if (data) {
            const mappingData = data.map((item) => {
                const { user, category, ...rest } = item

                let title = null;
                if (category && category.category) {
                    title = category.category.title
                }

                return { ...rest, email: user.email, category: title }
            })

            //handle filter data
            const filteredData = filterData(filter, mappingData)

            // handle pagination data
            const paginationData = paginatedData(page, perPage, filteredData)


            res.status(200).json({ data: paginationData, total: mappingData.length })
        } else {
            res.status(401).json({ message: 'No data' })
        }
    } catch (error) {
        // eslint-disable-next-line no-console
        console.log(error);
        // 500 (Internal Server Error) - Something has gone wrong in your application.
        const httpError = createHttpError(500, error);
        return res.status(500).json({ message: httpError });
    }
}

const createBooking = async (req, res) => {
    try {
        const { title, place, category, date } = req.body

        const dateMapping = date.map((item) => {
            let newDate = moment(item, FORMAT_DATE)
            newDate = moment().toISOString()
            return newDate
        })

        const token = await getDecodedToken(req);

        const data = await prisma.booking.create({
            data: {
                title: title,
                place: place,
                user: {
                    connect: {
                        email: token.email
                    }
                },
                status: STATUS.pending,
                category: {
                    create: {
                        category: {
                            connect: {
                                title: category
                            }
                        }
                    }
                },
                date: {
                    create: dateMapping.map((item) => ({
                        startDate: item,
                    }))
                }
            }
        })

        return res.status(200).json({ message: 'Create new booking successfully' })
    } catch (error) {
        // eslint-disable-next-line no-console
        console.log(error);
        // 500 (Internal Server Error) - Something has gone wrong in your application.
        const httpError = createHttpError(500, error);
        return res.status(500).json({ message: httpError });
    }
}

const deleteBooking = async (req, res) => {
    try {
        const { id } = req.params

        const data = await prisma.booking.findUnique({
            where: {
                id
            },
        })

        if (!data) {
            res.status(401).json({ message: 'No data' })
        } else {
            await prisma.bookingDate.deleteMany({
                where: {
                    bookingId: id
                }
            })

            await prisma.bookingCategory.deleteMany({
                where: {
                    bookingId: id
                }
            })

            await prisma.booking.delete({
                where: {
                    id
                }
            })
            return res.status(200).json({ message: 'Delete booking successfully' })
        }

    } catch (error) {
        // eslint-disable-next-line no-console
        console.log(error);
        // 500 (Internal Server Error) - Something has gone wrong in your application.
        const httpError = createHttpError(500, error);
        return res.status(500).json({ message: httpError });
    }
}

const updateStatusBooking = async (req, res) => {
    try {
        const { dateId, status } = req.body;
        const { id } = req.params;
        const token = await getDecodedToken(req);

        // if not admin
        if (token.type !== TYPE_USER.admin) {
            return res.status(403).json({ message: 'Do not have permission to perform this action!' })
        }

        // only have dateId || status
        if (dateId && !status) {

            // 1. find booking date
            const bookingDate = await prisma.bookingDate.findMany({
                where: {
                    bookingId: id
                }
            })

            let newBookingDate = [...bookingDate]
            newBookingDate = newBookingDate.map((item) => {
                if (item.id === dateId) {
                    return { ...item, isConfirm: true }
                }
                return { ...item, isConfirm: false, isActive: false }
            })

            //2. update booking date status
            newBookingDate.forEach(async (item) => {
                await prisma.bookingDate.update({
                    where: {
                        id: item.id
                    },
                    data: {
                        isConfirm: item.isConfirm,
                        isActive: item.isActive,
                    }
                })
            })

            //3. update booking status
            await prisma.booking.update({
                where: {
                    id
                },
                data: {
                    status: STATUS.approve
                }
            })
        }

        if (status && !dateId) {

            const bookingItem = await prisma.booking.findUnique({
                where: { id }
            })

            if (bookingItem) {
                //update booking status
                await prisma.booking.update({
                    where: {
                        id
                    },
                    data: {
                        status: status
                    }
                })

                await prisma.bookingDate.updateMany({
                    where: {
                        bookingId: id
                    },
                    data: {
                        isActive: false
                    }
                })

            } else {
                return res.status(401).json({ message: 'No data' })

            }
        }

        return res.status(200).json({ message: 'Update booking items successfully' })

    }
    catch (error) {
        // eslint-disable-next-line no-console
        console.log(error);
        // 500 (Internal Server Error) - Something has gone wrong in your application.
        const httpError = createHttpError(500, error);
        return res.status(500).json({ message: httpError });
    }
}

export const booking = {
    getBookings,
    deleteBooking,
    createBooking,
    updateStatusBooking
}