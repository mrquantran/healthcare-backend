import express from 'express';
import { body } from 'express-validator';
import { getAllUser } from '../../controller/account/accountmanagement.js';
// import { REGEX_EMAIL } from '../../constant/ENUM.js';
import { validate } from '../../validation/validate.js';

const router = express.Router();

router.get('/getUsers',getAllUser);

export default router;
