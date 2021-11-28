import express from "express";
import login from "./account/login.js"
import booking from "./booking/booking.js"

const router = express.Router();

/*-------------------------------------------------------------------------*/
// Below all APIs are public APIs protected by api-key
/*-------------------------------------------------------------------------*/

// End point for booking
router.use('/bookings', booking)

// Endpoint to login or register and to send the short lived token
router.use('/login', login);

export default router;
