import { celebrate, Joi } from 'celebrate';

export const signupValidation = celebrate({
  body: Joi.object({
    fullName: Joi.string().required().min(4).max(30).trim().messages({
      'string.base': 'Name should be a string',
      'string.empty': 'Name cannot be empty',
      'string.min': 'Name should have at least 4 characters',
      'string.max': 'Name should not be more than 30 characters',
      'any.required': 'Name is required',
    }),
    email: Joi.string().email().required().trim().messages({
      'string.email': 'Email is not valid',
      'string.empty': 'Email cannot be empty',
      'any.required': 'Email is required',
    }),
    avatar: Joi.string().default('default-user.jpg'),
    password: Joi.string().required().min(6).max(30).messages({
      'any.required': 'Password is required',
      'string.empty': 'Password cannot be empty',
      'string.min': 'Password should be {#limit} characters long',
      'string.max': 'Password should not be more than {#limit} characters',
    }),
    passwordConfirm: Joi.any()
      .valid(Joi.ref('password'))
      .required()
      .messages()
      .options({
        messages: {
          'any.required': 'Password Confirm is required',
          'any.empty': 'Password confirm cannot be empty',
          'any.only': 'Password and password confirm mismatch',
        },
      }),
  }),
});

export const loginValidtion = celebrate({
  body: Joi.object({
    email: Joi.string().email().required().trim().messages({
      'string.email': 'Email is not valid',
      'string.empty': 'Please provide email address',
      'any.required': 'Email is required',
    }),
    password: Joi.string().required().min(6).max(30).messages({
      'any.required': 'Password is required',
      'string.empty': 'Password cannot be empty',
      'string.min': 'Password should be {#limit} characters long',
    }),
  }),
});

export const forgotPasswordValidation = celebrate({
  body: Joi.object({
    email: Joi.string().email().required().trim().messages({
      'string.email': 'Email is not valid',
      'string.empty': 'Please provide email address',
    }),
  }),
});

export const updateUserDataValidation = celebrate({
  body: Joi.object({
    fullName: Joi.string().min(4).max(30).trim().messages({
      'string.base': 'Name should be a string',
      'string.min': 'Name should have at least 4 characters',
      'string.max': 'Name should not be more than 30 characters',
    }),
    email: Joi.string().email().trim().messages({
      'string.email': 'Email is not valid',
      'string.empty': 'Email cannot be empty',
    }),
  }),
});
