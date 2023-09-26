import { Segments, Joi, celebrate } from 'celebrate';

const cabinValidation = celebrate({
  [Segments.BODY]: Joi.object().keys({
    name: Joi.string().trim().required(),
    regularPrice: Joi.number().integer().required(),
    maxCapacity: Joi.number().integer().required(),
    discount: Joi.number().integer().required(),
    description: Joi.string().required(),
    image: Joi.string(),
    createdAt: Joi.date().default(Date.now()).forbidden(),
  }),
});

export default cabinValidation;
