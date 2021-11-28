import express from 'express';
import { categories } from '../../controller/categories/categoryController.js';
import { isAuth } from '../../middleware/isAuth.js';

const router = express.Router();

router.get('/', isAuth, categories.getCategoryOptions)

export default router;
