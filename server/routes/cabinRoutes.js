import express from 'express';
import * as cabinController from '../controllers/cabinController.js';
import cabinValidation from '../validation/cabinValidation.js';
import * as authController from '../controllers/authController.js';

const router = express.Router();

router.use(authController.protect);

router.get(
  '/',
  authController.isRestrictedTo('user', 'admin'),
  cabinController.getCabins
);
router.post(
  '/',
  cabinController.upload.single('image'),
  cabinValidation,
  cabinController.createCabin
);

router.patch(
  '/:id',
  cabinController.upload.single('image'),
  cabinController.updateCabin
);
router.delete('/:id', cabinController.deleteCabin);

export default router;
