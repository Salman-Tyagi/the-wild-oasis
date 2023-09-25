import express from 'express';
import cabinRouter from './routes/cabinRoutes.js';
import { errors } from 'celebrate';

const app = express();
app.use(express.json());

app.use((req, res, next) => {
  console.log('Set CORS');
  res.setHeader('Access-Control-Allow-Origin', '*');

  next();
});

app.use('/api/v1/cabins', cabinRouter);
app.use('*', (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'Something went wrong',
  });
});

app.use(errors());

export default app;
