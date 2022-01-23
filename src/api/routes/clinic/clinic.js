/* eslint-disable no-unused-vars */
import express from 'express';
import { clinics } from "../../controller/clinic/clinic.js"
import { clinicController } from '../../controller/clinic/clinicController.js';
import {
    body,
    param,
} from 'express-validator';
import { validate } from '../../validation/validate.js';

const router = express.Router();

// localhost:3000/v1/clinic/uploadMechanism POST
router.post('/uploadMechanism', clinics.uploadMechanism)

router.get('/', clinicController.getClinics)

router.get('/:id', validate([
    param('id')
        .notEmpty()
        .withMessage('Id can not be empty')
        .isString()
        .withMessage('Id is not correct format')
]), clinicController.getClinic)

router.post('/', validate([
    body('no')
        .notEmpty()
        .withMessage('Numerical order can not be empty')
        .isNumeric()
        .withMessage('Numerical order is not correct format'),
    body('name')
        .notEmpty()
        .withMessage('Name can not be empty')
        .isString()
        .withMessage('Name is not correct format'),
    body('address')
        .notEmpty()
        .withMessage('Address can not be empty')
        .isString()
        .withMessage('Address is not correct format'),
    body('district')
        .notEmpty()
        .withMessage('District can not be empty')
        .withMessage('District is not correct format'),
    body('workHours')
        .notEmpty()
        .withMessage('workHours can not be empty')
        .isString()
        .withMessage('workHours is not correct format'),
    body('city')
        .notEmpty()
        .withMessage('city can not be empty')
        .isString()
        .withMessage('city is not correct format'),
    // body('email')
    //     .notEmpty()
    //     .withMessage('email can not be empty')
    //     .isString()
    //     .withMessage('email is not correct format'),
]), clinicController.createClinic)

router.delete('/:id', validate([
    param('id')
        .notEmpty()
        .withMessage('Id can not be empty')
        .isString()
        .withMessage('Id is not correct format')
]), clinicController.deleteClinic)

router.put('/:id', validate([
    body('name').optional(),
    body('address').optional(),
    body('district').optional(),
    body('workHours').optional(),
    body('city').optional(),
]), clinicController.updateClinic)

export default router;