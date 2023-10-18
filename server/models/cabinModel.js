import mongoose from 'mongoose';

const cabinSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  regularPrice: {
    type: Number,
    required: true,
  },
  maxCapacity: {
    type: Number,
    required: true,
  },
  discount: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    default: 'defaultCabin.jpg',
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

const Cabin = mongoose.model('Cabin', cabinSchema);

export default Cabin;
