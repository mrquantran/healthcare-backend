import express from "express";
import login from "./account/login.js"
import booking from "./booking/booking.js"
import categories from "./categories/categories.js"
import feedback from "./feedback/feedback.js"
import clinic from "./clinic/clinic.js"
import account from './account/accountmanagement.js'

const router = express.Router();

/*-------------------------------------------------------------------------*/
// Below all APIs are public APIs protected by api-key
/*-------------------------------------------------------------------------*/

//End point for get option categories
router.use('/categories', categories)

// End point for booking
router.use('/bookings', booking)

// End point for booking feedback - ...
router.use('/booking', feedback)

// End point for upload clinic 
router.use('/clinic', clinic)

router.use('/account', account)

// Endpoint to login or register and to send the short lived token
router.use('/', login);


export default router;
