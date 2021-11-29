import express from 'express';
import {
    body,
    param,
} from 'express-validator';
import { feedback } from "../../controller/feedback/feedback.js"
import { isAdmin } from '../../middleware/isAdmin.js';
import { isAuth } from '../../middleware/isAuth.js';
import { validate } from '../../validation/validate.js';

const router = express.Router();


router.post('/:id/feedback', validate([
    param('id')
        .notEmpty()
        .withMessage('Id can not be empty')
        .isString()
        .withMessage('Id is not correct format'),
    body('description')
        .notEmpty()
        .withMessage('Feedback can not be empty')
        .isString()
        .withMessage('Feedback is not correct format'),
]), [isAuth, isAdmin, feedback.createRejectReason])

export default router;
