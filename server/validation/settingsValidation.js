import { Segments, Joi, celebrate } from 'celebrate';

const createSettingsValidation = celebrate({
  [Segments.BODY]: Joi.object().keys({
    minNightsPerBooking: Joi.number().integer().required(),
    maxNightsPerBooking: Joi.number().integer().required(),
    maxGuestsPerBooking: Joi.number().integer().required(),
    breakfastPrice: Joi.number().integer().required(),
  }),
});

const updateSettingsValidation = celebrate({
  [Segments.PARAMS]: {
    id: Joi.string().alphanum().required(),
  },
  [Segments.BODY]: Joi.object().keys({
    minNightsPerBooking: Joi.number().integer(),
    maxNightsPerBooking: Joi.number().integer(),
    maxGuestsPerBooking: Joi.number().integer(),
    breakfastPrice: Joi.number().integer(),
  }),
});

export { createSettingsValidation, updateSettingsValidation };
