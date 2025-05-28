import { Router } from 'express';
import exampleRoutes from './example.route.js';

const router = Router();
router.use('/examples', exampleRoutes);

export default router;