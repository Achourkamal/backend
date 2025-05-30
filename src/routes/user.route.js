import express from 'express';

// Import controllers and middlewares
import userControllers from '../controllers/user.controller.js'
const router = express.Router();

// Define routes
router.post('/', userControllers.createUser);
router.get('/', userControllers.getAllUsers);
router.get('/:id', userControllers.getUserById);
router.put('/:id', userControllers.updateUser);
router.delete('/:id', userControllers.deleteUser);

export default router;