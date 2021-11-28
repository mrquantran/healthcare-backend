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

const tokenList = {};

const { accessTokenLife, refreshTokenLife } = tokenInfo;

const comparePassword = (passwordReq,password) => {
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
        type:true,
        id: true,
      },
    });

    const {
      email, firstName, lastName, password, id, type
    } = emailUser;

    if (!email) {
      return res.status(403).json({ message: 'email not created' });
    }

    // 👇 create a date object for the email token expiration
    const tokenExpiration = add(new Date(), {
      minutes: 60,
    });

    //   compare password
    if (comparePassword(passwordReq,password)) {
      return res.status(402).json({ message: 'password not correct' });
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
          create:{
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
  // User gửi mã refresh token kèm theo trong body
  const refreshTokenFromClient = req.body.refreshToken;

  // Nếu như tồn tại refreshToken truyền lên và nó cũng nằm trong tokenList của chúng ta
  if (refreshTokenFromClient && (tokenList[refreshTokenFromClient])) {
    try {
      // Verify kiểm tra tính hợp lệ của cái refreshToken và lấy dữ liệu giải mã decoded
      const decoded = await jwtHelper.verifyToken(refreshTokenFromClient, refreshTokenSecret);

      // Thông tin user lúc này các bạn có thể lấy thông qua biến decoded.data
      // có thể mở comment dòng debug bên dưới để xem là rõ nhé.
      // debug("decoded: ", decoded);
      const userFakeData = decoded.data;
      const accessToken = await jwtHelper.generateToken(userFakeData, accessTokenSecret, accessTokenLife);

      // gửi token mới về cho người dùng
      return res.status(200).json({ accessToken });
    } catch (error) {
      res.status(403).json({
        message: 'Invalid refresh token.',
      });
    }
  }
};

export { login, refreshToken };
