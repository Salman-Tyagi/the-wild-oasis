import { Joi, celebrate } from 'celebrate';

const cabinValidation = celebrate({
  body: Joi.object({
    name: Joi.string().required(),
    regularPrice: Joi.number().integer().required(),
    maxCapacity: Joi.number().integer().required(),
    discount: Joi.number().integer().required(),
    description: Joi.string().required(),
    image: Joi.string().default('defaultCabin.jpg'),
  }),
});

export default cabinValidation;
