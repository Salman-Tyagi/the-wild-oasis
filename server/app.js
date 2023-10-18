import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import cors from 'cors';
import helmet from 'helmet';
import mongoSanitize from 'express-mongo-sanitize';
import { errors } from 'celebrate';

import cabinRouter from './routes/cabinRoutes.js';
import settingsRouter from './routes/settingsRoutes.js';
import AppError from './utils/appError.js';
import globalErrorMiddlewareHandler from './controllers/globalErrorMiddlewareHandler.js';

dotenv.config({ path: '.env' });

const app = express();
app.use(helmet());

app.use(express.json());

app.use(mongoSanitize());

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(cors()); // or

// app.use((req, res, next) => {
//   res.setHeader('Access-Control-Allow-Origin', '*');
//   res.setHeader('Access-Control-Allow-Methods', '*');
//   res.setHeader('Access-Control-Allow-Headers', '*');

//   next();
// });

app.use('/api/v1/cabins', cabinRouter);
app.use('/api/v1/settings', settingsRouter);

app.use('*', (req, res, next) => {
  return next(
    new AppError(`Can't find ${req.originalUrl} on this server`, 404)
  );
});

app.use(globalErrorMiddlewareHandler);

app.use(errors());

export default app;
