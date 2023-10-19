import crypto from 'crypto';
import User from '../models/userModel.js';
import AppError from '../utils/appError.js';
import jwt from 'jsonwebtoken';

import sendEmail from '../utils/email.js';

export const signup = async (req, res, next) => {
  try {
    const newUser = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      passwordConfirm: req.body.passwordConfirm,
    });

    res.status(201).json({
      status: 'success',
      data: newUser,
    });
  } catch (err) {
    next(err);
  }
};

export const login = async (req, res, next) => {
  try {
    // Check input fields are filled
    const { email, password } = req.body;

    if (!email || !password)
      return next(new AppError('Please provide email or password', 400));

    // Find user based on email POSTED
    const user = await User.findOne({ email, active: true }).select(
      '+password'
    );
    if (!user) return next(new AppError('Incorrect email or password', 400));

    // Check email or password is correct
    const correct = await user.comparePassword(user.password, password); // returns boolean
    if (!correct) return next(new AppError('Incorrect email or password', 401));

    // If everything is okay, send token to client and set in cookie
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });

    // Set token as cookie
    const cookieOptions = {
      expires: new Date(
        Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
      ),
      secure: false,
      httpOnly: true,
    };

    if (process.env.NODE_ENV === 'production') cookieOptions.secure = true;
    res.cookie('token', token, cookieOptions);

    res.status(200).json({
      status: 'success',
      token,
    });
  } catch (err) {
    next(err);
  }
};

export const protect = async (req, res, next) => {
  try {
    let token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    ) {
      token = req.headers.authorization.split(' ')[1];
    } else if (req.cookies.token) {
      token = req.cookies.token;
    }

    // Check token is valid
    const decode = jwt.verify(token, process.env.JWT_SECRET_KEY);

    // Find user still exists after jwt issue
    const currentUser = await User.findOne({
      _id: decode.id,
      active: true,
    });

    if (!currentUser)
      return next(
        new AppError('User belongs to this token does not exists', 404)
      );

    // Check user changed the password if changed return error
    const hasChangedPassword = currentUser.passwordChangedAfter(decode.iat);
    if (hasChangedPassword)
      return next(
        new AppError(
          'User recently changed the password! Please login again',
          401
        )
      );

    // if everything ok, allow access the user
    req.user = currentUser;

    next();
  } catch (err) {
    next(err);
  }
};

export const isRestrictedTo = (...roles) => {
  return (req, res, next) => {
    if (roles.includes(req.user.role)) return next();
    return next(new AppError('Access denied to this route', 403));
  };
};

export const forgotPassword = async (req, res, next) => {
  try {
    // 1. Find user based on POSTED email
    const { email } = req.body;
    if (!email) return next(new AppError('Provide email address', 400));

    const user = await User.findOne({ email, active: true });
    if (!user) return next(new AppError('Incorrect email address', 400));

    // If user, generate a random token and sent with email
    const resetToken = user.generatePasswordResetToken();
    await user.save({ validateBeforeSave: false });

    const resetUrl = `${req.protocol}://${req.get(
      'host'
    )}/api/v1/users/auth/${resetToken}`;

    try {
      await sendEmail({
        email: user.email,
        subject: 'Forgot password reset link',
        message: `Your password reset link valid for 10 minutes only. Reset link: ${resetUrl}.`,
      });

      res.status(200).json({
        status: 'success',
        message: 'Email sent successfully!',
      });
    } catch (err) {
      user.passwordResetToken = undefined;
      user.passwordResetTokenExpires = undefined;
      await user.save({ validateBeforeSave: false });

      res.status(200).json({
        status: 'success',
        message: 'Email sent successfully!',
      });
    }
  } catch (err) {
    next(err);
  }
};

export const resetPassword = async (req, res, next) => {
  try {
    // 1. Find user based on the token provided by the POSTED request
    const resetToken = crypto
      .createHash('sha256')
      .update(req.params.resetToken)
      .digest('hex');

    const user = await User.findOne({
      passwordResetToken: resetToken,
      active: true,
      passwordResetTokenExpires: { $gt: Date.now() },
    });

    console.log(user);
    if (!user) return next(new AppError('Password reset link expired!', 400));

    // 2. Changed password and send new token to client
    user.password = req.body.password;
    user.passwordConfirm = req.body.passwordConfirm;
    user.passwordChangedAt = Date.now();
    user.passwordResetToken = undefined;
    user.passwordResetTokenExpires = undefined;
    await user.save();

    res.status(200).json({
      status: 'success',
      message: 'Password updated successfully!',
    });
  } catch (err) {
    next(err);
  }
};
