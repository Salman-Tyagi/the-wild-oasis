import express from 'express';
import * as authController from '../controllers/authController.js';
import * as userValidation from '../validation/userValidation.js';

const router = express.Router();

router.use(authController.protect);

router.get('/current-user', authController.getCurrentUser);

router.patch(
  '/update-user',
  authController.upload.single('avatar'),
  userValidation.updateUserDataValidation,
  authController.updateUserData
);

router.patch('/update-password', authController.updateUserPassword);

export default router;
