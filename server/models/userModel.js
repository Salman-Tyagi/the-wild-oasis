import crypto from 'crypto';
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: [true, 'Please provide your name'],
    minLength: [4, 'Name should be 4 characters long'],
    maxLength: [30, 'Name should not be more than 20 characters'],
    trim: true,
  },
  email: {
    type: String,
    required: [true, 'Provide your email address'],
    unique: [true, 'Email already exists'],
  },
  avatar: {
    type: String,
    default: 'default-user.jpg',
  },
  password: {
    type: String,
    required: [true, 'Provide password'],
    minLength: [6, 'Password should be 6 characters long'],
    select: false,
  },
  passwordConfirm: {
    type: String,
    required: [true, 'Provide confirm password'],
    validator: {
      validate: function (pass) {
        this.password === pass;
      },
      message: 'Password are not same',
    },
  },
  role: {
    type: String,
    default: 'user',
  },
  active: {
    type: Boolean,
    default: true,
    select: false,
  },
  verified: {
    type: Boolean,
    default: false,
    select: false,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
    select: false,
  },
  passwordChangedAt: {
    type: Date,
  },
  passwordResetToken: String,
  passwordResetTokenExpires: Date,
});

userSchema.pre('save', async function (next) {
  if (this.isModified('password') || this.isNew) {
    this.password = await bcrypt.hash(this.password, 12);
    this.passwordConfirm = undefined;

    return next();
  }

  next();
});

userSchema.methods.comparePassword = async function (password, inputPassword) {
  return await bcrypt.compare(inputPassword, password);
};

userSchema.methods.passwordChangedAfter = function (jwtTimestamp) {
  if (this.passwordChangedAt) {
    const passwordTimestamp = parseInt(
      this.passwordChangedAt.getTime() / 1000,
      10
    );

    if (jwtTimestamp < passwordTimestamp) return true;
  }

  return false;
};

// Password reset token
userSchema.methods.generatePasswordResetToken = function () {
  const resetToken = crypto.randomBytes(32).toString('hex');

  this.passwordResetToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');

  this.passwordResetTokenExpires = Date.now() + 10 * 60 * 1000;

  return resetToken;
};

const User = mongoose.model('User', userSchema);

export default User;
