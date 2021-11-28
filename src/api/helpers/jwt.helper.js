import jwt from 'jsonwebtoken';
import { JWT_ALGORITHM } from '../constant/ENUM.js';

/**
 * private function generateToken
 * @param user
 * @param secretSignature
 * @param tokenLife
 */
export const generateToken = (user, secretSignature, tokenLife) => new Promise((resolve, reject) => {
  // Định nghĩa những thông tin của user mà bạn muốn lưu vào token ở đây
  const {
    email, firstName, lastName, id, type
  } = user;
  // Thực hiện ký và tạo token
  jwt.sign(
    {
      data: {
        email,
        type,
        firstName,
        lastName,
        id,
      },
    },
    secretSignature,
    {
      algorithm: JWT_ALGORITHM,
      expiresIn: tokenLife,
    },
    (error, token) => {
      if (error) {
        // eslint-disable-next-line no-console
        console.log(error);
        return reject(error);
      }
      // eslint-disable-next-line no-console
      // console.log(token);
      resolve(token);
    },
  );
});

/**
 * This module used for verify jwt token
 * @param {*} token
 * @param {*} secretKey
 */

export const verifyToken = (token, secretKey) => new Promise((resolve, reject) => {
  jwt.verify(token, secretKey, (error, decoded) => {
    if (error) {
      return reject(error);
    }
    resolve(decoded);
  });
});
