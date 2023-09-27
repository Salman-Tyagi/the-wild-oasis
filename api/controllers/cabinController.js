import Cabin from '../models/cabinModel.js';
import multer from 'multer';

const multerStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/');
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image')) {
    cb(null, true);
  } else {
    cb(new Error('Not an image. Supported images jpeg and png'), false);
  }
};

export const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});

export const createCabin = async (req, res) => {
  try {
    const filteredObject = req.body;
    if (req.file) filteredObject.image = req.file.filename;

    const cabin = await Cabin.create(filteredObject);

    res.status(201).json({
      status: 'success',
      data: cabin,
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err.message,
    });
  }
};

export const getCabins = async (req, res) => {
  try {
    const cabins = await Cabin.find();
    res.status(200).json({
      status: 'success',
      data: {
        cabins,
      },
    });
  } catch {
    res.status(404).json({
      status: 'fail',
      message: err.message,
    });
  }
};

export const updateCabin = async (req, res) => {
  try {
    const updatedCabin = await Cabin.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        runValidators: true,
        new: true,
      }
    );

    res.status(201).json({
      status: 'success',
      updatedCabin,
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err.message,
    });
  }
};

export const deleteCabin = async (req, res) => {
  try {
    await Cabin.findByIdAndDelete(req.params.id);
    res.status(204).json({
      data: null,
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err.message,
    });
  }
};
