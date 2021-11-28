import express from 'express';
// import {
//   body,
//   param,
// } from 'express-validator';
import { booking } from '../../controller/booking/bookingController.js';
import { isAuth } from '../../middleware/isAuth.js';

const router = express.Router();

router.get('/', isAuth, booking.getBookings)

export default router;
