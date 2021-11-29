import express from 'express';
import { body } from 'express-validator';
// import { REGEX_EMAIL } from '../../constant/ENUM.js';
import { login, refreshToken } from '../../controller/account/login.js';
import { validate } from '../../validation/validate.js';

const router = express.Router();

router.post('/login', validate([
  body('email')
    .notEmpty()
    .withMessage('email can not be empty')
    .isString()
    .withMessage('email is not a valid email address'),
  body('password')
    .notEmpty()
    .withMessage('password can not be empty')
]), login);

router.post('/refresh-token', validate([
  body('accessToken')
    .notEmpty()
    .withMessage('email can not be empty')
    .isString()
    .withMessage('email is not a valid email address'),
  body('refreshToken')
    .notEmpty()
    .withMessage('password can not be empty')
]), refreshToken)

export default router;
