import { isCelebrateError } from 'celebrate';
import AppError from '../utils/appError.js';

const handleDuplicateDBError = err => {
  const errDetails = Object.values(err.keyValue).at(0);
  const message = `${errDetails} is already exists`;
  return new AppError(message, 400);
};

const invalidTokenError = () => {
  return new AppError('Invalid token! Please login again.', 401);
};

const jwtTokenExpired = () =>
  new AppError('Invalid token or expired! Please login agan', 401);

const errorDev = (err, res) => {
  console.log('ErrorDev ===>', err);

  if (isCelebrateError(err)) {
    return res.status(400).json({
      status: 'fail',
      message: Array.from(err.details.values())[0].details[0].message,
      error: Array.from(err.details.values())[0].details[0],
      stack: err.stack,
    });
  }

  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
    error: err,
    stack: err.stack,
  });
};

const errorPro = (err, res) => {
  console.log('ErrorPro ===>', err);

  if (isCelebrateError(err)) {
    return res.status(400).json({
      status: 'fail',
      message: Array.from(err.details.values())[0].details[0].message,
    });
  }

  if (err.isOperational) {
    return res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  }

  // If error is not operational, don't leak unneccessay errors
  res.status(500).json({
    status: 'error',
    message: 'Something went wrong',
  });
};

const globalErrorMiddlewareHandler = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';
  err.message = err.message || 'Something went wrong';

  if (process.env.NODE_ENV === 'development') {
    if (err.code === 11000) err = handleDuplicateDBError(err);
    if (err.name === 'JsonWebTokenError') err = invalidTokenError();
    if (err.name === 'TokenExpiredError') err = jwtTokenExpired();

    errorDev(err, res);
  }

  if (process.env.NODE_ENV === 'production') {
    if (err.code === 11000) err = handleDuplicateDBError(err);
    if (err.name === 'JsonWebTokenError') err = invalidTokenError();
    if (err.name === 'TokenExpiredError') err = jwtTokenExpired();

    errorPro(err, res);
  }
};

export default globalErrorMiddlewareHandler;
