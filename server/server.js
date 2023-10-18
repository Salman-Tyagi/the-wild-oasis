import mongoose from 'mongoose';
import app from './app.js';

(async () => {
  try {
    mongoose.connect('mongodb://localhost:27017/wild-oasis');
    console.log('Successfully connected to DB');
  } catch (err) {
    console.log(err);
  }
})();

const port = 9000;
app.listen(port, () => console.log('Listening to the port', port));
