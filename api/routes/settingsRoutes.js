import express from 'express';
import * as settingsController from '../controllers/settingsController.js';
import settingsValidation from '../validation/settingsValidation.js';

const router = express.Router();

router.post('/', settingsValidation, settingsController.createSettings);
router.get('/', settingsController.getSettings);

export default router;
