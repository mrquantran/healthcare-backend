import pkg from '@prisma/client';
import { add } from 'date-fns';
import bcrypt from 'bcrypt';
import { accessTokenSecret, refreshTokenSecret, tokenInfo } from '../../../config.js';
import * as jwtHelper from '../../helpers/jwt.helper.js';

const { PrismaClient } = pkg;
const prisma = new PrismaClient();

// eslint-disable-next-line no-return-await
export const findSpecificUser = async (emailInput) => {
  const email = await prisma.user.findUnique({
    where: {
      email: emailInput,
    },
    select: {
      email: true,
    },
  });

  return email;
};


const { accessTokenLife, refreshTokenLife } = tokenInfo;

const comparePassword = (passwordReq, password) => {
  return !bcrypt.compareSync(passwordReq, password)
}

/**
 * controller login
 * @param {*} req
 * @param {*} res
 */
const login = async (req, res) => {
  try {
    // 👇 get the email from the request payload
    const { email: emailReq, password: passwordReq } = req.body;

    const emailUser = await prisma.user.findUnique({
      where: {
        email: emailReq,
      },
      select: {
        email: true,
        firstName: true,
        lastName: true,
        password: true,
        type: true,
        id: true,
      },
    });

    if (!emailUser) {
      return res.status(403).json({ message: 'Email not have in database' });
    }

    const {
      email, firstName, lastName, password, id, type
    } = emailUser;



    // 👇 create a date object for the email token expiration
    const tokenExpiration = add(new Date(), {
      hours: 10,
    });

    //   compare password
    if (comparePassword(passwordReq, password)) {
      return res.status(403).json({ message: 'password not correct' });
    }

    const user = {
      email, firstName, lastName, id, type
    };

    const accessToken = await jwtHelper.generateToken(user, accessTokenSecret, accessTokenLife);
    const refreshToken = await jwtHelper.generateToken(user, refreshTokenSecret, refreshTokenLife);

    // 👇 create a short lived token and update user or create if they don't exist
    await prisma.token.create({
      data: {
        accessToken,
        refreshToken,
        expiration: tokenExpiration,
        user: {
          connectOrCreate: {
            create: {
              email
            },
            where: {
              email,
            }
          }
        },
      },
    });

    return res.status(200).json({ accessToken, refreshToken });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error);
    return res.status(500).json({ message: error });
  }
};

/**
 * controller refreshToken
 * @param {*} req
 * @param {*} res
 */
const refreshToken = async (req, res) => {
  const refreshTokenFromClient = req.body.refreshToken;

  if (refreshTokenFromClient) {
    try {

      const { refreshToken } = await prisma.token.findUnique({
        where: {
          refreshToken: refreshTokenFromClient
        }
      })


      if (!refreshToken) {
        return res.status(403).json({
          message: 'Invalid refresh token.',
        });
      }

      const decoded = await jwtHelper.verifyToken(refreshTokenFromClient, refreshTokenSecret);

      const userData = decoded.data;
      const accessToken = await jwtHelper.generateToken(userData, accessTokenSecret, 60);

      // 👇 create a date object for the email token expiration
      const tokenExpiration = add(new Date(), {
        minutes: 1,
      });

      await prisma.token.create({
        data: {
          accessToken: accessToken,
          refreshToken: refreshToken,
          expiration: tokenExpiration,
          user: {
            connectOrCreate: {
              create: {
                email: userData.email
              },
              where: {
                email: userData.email,
              }
            }
          },
        }
      })

      // send new access token
      return res.status(200).json({ accessToken, refreshToken });
    } catch (error) {
      res.status(403).json({
        message: 'Invalid refresh token.',
      });
    }
  }
};

export { login, refreshToken };
