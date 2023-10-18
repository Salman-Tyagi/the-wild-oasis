import mongoose from 'mongoose';

const settingsSchema = new mongoose.Schema({
  minNightsPerBooking: {
    type: Number,
    required: true,
  },
  maxNightsPerBooking: {
    type: Number,
    required: true,
  },
  maxGuestsPerBooking: {
    type: Number,
    required: true,
  },
  breakfastPrice: {
    type: Number,
    required: true,
  },
});

const Settings = mongoose.model('Settings', settingsSchema);

export default Settings;
