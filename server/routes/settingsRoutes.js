import express from 'express';
import * as settingsController from '../controllers/settingsController.js';
import * as settingsValidation from '../validation/settingsValidation.js';
import * as authController from '../controllers/authController.js';

const router = express.Router();

router.use(authController.protect);

router.post(
  '/',
  settingsValidation.createSettingsValidation,
  settingsController.createSettings
);
router.get('/', settingsController.getSettings);
router.patch(
  '/:id',
  settingsValidation.updateSettingsValidation,
  settingsController.updateSettings
);

export default router;
