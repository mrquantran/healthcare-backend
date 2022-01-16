import express from 'express';
import { clinics } from "../../controller/clinic/clinic.js"

const router = express.Router();

// localhost:3000/v1/clinics/uploadMechanism POST
router.post('/uploadMechanism',clinics.uploadMechanism)

export default router;