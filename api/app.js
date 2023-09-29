import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import { errors } from 'celebrate';

import cabinRouter from './routes/cabinRoutes.js';
import settingsRouter from './routes/settingsRoutes.js';

dotenv.config({ path: '.env' });

const app = express();
app.use(express.json());

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', '*');
  res.setHeader('Access-Control-Allow-Headers', '*');

  next();
});

app.use('/api/v1/cabins', cabinRouter);
app.use('/api/v1/settings', settingsRouter);

app.use('*', (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'Something went wrong',
  });
});

app.use(errors());

export default app;
