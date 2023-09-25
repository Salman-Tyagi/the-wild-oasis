import Cabin from '../models/cabinModel.js';

export const createCabin = async (req, res) => {
  try {
    const cabin = await Cabin.create(req.body);

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
    console.log('getCabins ----------->');
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
