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

router.delete('/:id', validate([
    param('id')
        .notEmpty()
        .withMessage('Id can not be empty')
        .isString()
        .withMessage('Id is not correct format')
]), isAuth, booking.deleteBooking)

export default router;
