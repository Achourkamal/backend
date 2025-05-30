import { Router } from 'express';
import exampleRoutes from './example.route.js';
import userRoutes from './user.route.js';

const router = Router();
router.use('/examples', exampleRoutes);
router.use('/users', userRoutes);

export default router;