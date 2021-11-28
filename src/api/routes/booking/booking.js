import express from 'express';
import {
    body,
    param,
} from 'express-validator';
import { booking } from '../../controller/booking/bookingController.js';
import { isAuth } from '../../middleware/isAuth.js';
import { validate } from '../../validation/validate.js';

const router = express.Router();

router.get('/', isAuth, booking.getBookings)

router.post('/', validate([
    body('title')
        .notEmpty()
        .withMessage('Title can not be empty')
        .isString()
        .withMessage('Title is not correct format'),
    body('place')
        .notEmpty()
        .withMessage('Place can not be empty')
        .isString()
        .withMessage('Place is not correct format'),
    body('category')
        .notEmpty()
        .withMessage('Category can not be empty')
        .isString()
        .withMessage('Category is not correct format'),
    body('date')
        .notEmpty()
        .withMessage('Date can not be empty')
        .isArray({ min: 1, max: 3 })
        .withMessage('Category is not correct format')
]), isAuth, booking.createBooking)


router.put('/:id/status', validate([
    param('id')
        .notEmpty()
        .withMessage('Id can not be empty')
        .isString()
        .withMessage('Id is not correct format')
]), isAuth, booking.updateStatusBooking)


router.delete('/:id', validate([
    param('id')
        .notEmpty()
        .withMessage('Id can not be empty')
        .isString()
        .withMessage('Id is not correct format')
]), isAuth, booking.deleteBooking)

export default router;
