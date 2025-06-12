import express from 'express';

// Import controllers and middlewares

import { updateExampleValidation, createExampleValidation, } from '../middlewares/validators/example.validator.js'
import authenticationController from '../controllers/autentication.controller.js';
const router = express.Router();

// Define routes
// SIGN UP
router.post('/signup', authenticationController.signUp);

// LOGIN
router.post('/login', authenticationController.login);

export default router;