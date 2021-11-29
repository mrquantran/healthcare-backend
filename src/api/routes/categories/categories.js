import express from 'express';
import { body } from 'express-validator';
import { categories } from '../../controller/categories/categoryController.js';
import { isAuth } from '../../middleware/isAuth.js';
import { validate } from '../../validation/validate.js';

const router = express.Router();

router.get('/', isAuth, categories.getCategoryOptions)

router.post('/', isAuth, validate([
    body('title')
        .notEmpty()
        .withMessage('Title can not be empty')
        .isString()
        .withMessage('Title is not correct format'),
]), categories.createCategory)


export default router;
