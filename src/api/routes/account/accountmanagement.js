import express from 'express';
import { body } from 'express-validator';
import { createAccount, getAllUser } from '../../controller/account/accountmanagement.js';
// import { REGEX_EMAIL } from '../../constant/ENUM.js';
import { validate } from '../../validation/validate.js';

const router = express.Router();

router.get('/getUsers', getAllUser);

router.post('/createAccount', validate([
    body('email')
        .notEmpty()
        .withMessage('email can not be empty')
        .isString()
        .withMessage('email is not a valid email address'),
    body('name')
        .notEmpty()
        .withMessage('name can not be empty'),
    body('roleId').notEmpty()
        .withMessage('name can not be empty')
]), createAccount)

export default router;
