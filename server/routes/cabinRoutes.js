import express from 'express';
import * as cabinController from '../controllers/cabinController.js';
import cabinValidation from '../validation/cabinValidation.js';

const router = express.Router();

router.get('/', cabinController.getCabins);
router.post(
  '/',
  cabinController.upload.single('image'),
  cabinValidation,
  cabinController.createCabin
);

router.patch(
  '/:id',
  cabinController.upload.single('image'),
  // cabinValidation,
  cabinController.updateCabin
);
router.delete('/:id', cabinController.deleteCabin);

export default router;
