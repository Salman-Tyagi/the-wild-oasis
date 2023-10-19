import express from 'express';
import * as authController from '../controllers/authController.js';
import * as userValidation from '../validation/userValidation.js';

const router = express.Router();

router.post('/signup', userValidation.signupValidation, authController.signup);
router.post('/login', userValidation.loginValidtion, authController.login);

router.post(
  '/forgot-password',
  userValidation.forgotPasswordValidation,
  authController.forgotPassword
);

router.post(
  '/reset-password/:resetToken',
  // userValidation.resetPasswordValidation,
  authController.resetPassword
);

export default router;
