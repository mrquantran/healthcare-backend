import express from 'express';
import { body } from 'express-validator';
import { REGEX_EMAIL } from '../../constant/ENUM.js';
import { login } from '../../controller/account/login.js';
import { validate } from '../../validation/validate.js';

const router = express.Router();

router.post('/', validate([
  body('email')
    .notEmpty()
    .withMessage('email can not be empty')
    .matches(REGEX_EMAIL)
    .withMessage('email is not a valid email address'),
  body('password')
    .notEmpty()
    .withMessage('password can not be empty')
]), login);

export default router;
