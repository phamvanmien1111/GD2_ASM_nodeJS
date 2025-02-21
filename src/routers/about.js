import express from 'express';
import aboutController from '../app/controllers/AboutController.js';

const router = express.Router();

// newController.index
router.use('/', aboutController.index);

export default router;
