import pkg from '@prisma/client';
import { add } from 'date-fns';
import bcrypt from 'bcrypt';
import { accessTokenSecret, refreshTokenSecret, tokenInfo } from '../../../config.js';
import * as jwtHelper from '../../helpers/jwt.helper.js';

const { PrismaClient } = pkg;
const prisma = new PrismaClient();


export const getAllUser = async (req, res) => {
    try {
        let data = await prisma.user.findMany({
            select: {
                id: true,
                firstName: true,
                lastName: true,
                email: true,
                type: true,
            }
        })


        data = [...data].map((item) => {
            return { ...item, userId: item.id, name: item.firstName + item.lastName, whiteLabelId: '#FFFFFF', role: item.type }
        })

        return res.status(200).json({ data });
    } catch (error) {
        // eslint-disable-next-line no-console
        console.log(error);
        return res.status(500).json({ message: error });
    }
};

export const createAccount = async (req, res) => {
    try {
        const { name, roleId, email } = req.body
        const saltRounds = await bcrypt.genSalt(10);
        const hash = bcrypt.hashSync('123456', saltRounds);

        await prisma.user.create({
            data: {
                firstName: name,
                lastName: '',
                active: true,
                email: email,
                type: roleId,
                password: hash
            }
        })

        return res.status(200).json({ msg: 'Create account successfully' });
    } catch (error) {
        // eslint-disable-next-line no-console
        console.log(error);
        return res.status(500).json({ message: error });
    }
};

