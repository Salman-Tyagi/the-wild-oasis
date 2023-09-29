import { Segments, Joi, celebrate } from 'celebrate';

const settingsValidation = celebrate({
  [Segments.BODY]: Joi.object().keys({
    minNightsPerBooking: Joi.number().integer().required(),
    maxNightsPerBooking: Joi.number().integer().required(),
    maxGuestsPerBooking: Joi.number().integer().required(),
    breakfastPrice: Joi.number().integer().required(),
  }),
});

export default settingsValidation;
