import mongoose from 'mongoose';
import dotenv from 'dotenv';
import morgan from 'morgan';
import path from 'path';
import app from './app.js';

const __dirname = path.resolve();
dotenv.config({
  path: path.resolve(__dirname, './api/.env'),
});

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

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
