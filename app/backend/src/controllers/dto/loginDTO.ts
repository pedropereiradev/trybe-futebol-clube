import * as Joi from 'joi';

const REQUIRED_MESSAGE = 'All fields must be filled';

const loginDTOValidation = Joi.object({
  email: Joi.string().required().messages({
    'any.required': REQUIRED_MESSAGE,
    'any.message': REQUIRED_MESSAGE,
    'string.empty': REQUIRED_MESSAGE,
  }),
  password: Joi.string().required().messages({
    'any.required': REQUIRED_MESSAGE,
    'any.message': REQUIRED_MESSAGE,
    'string.empty': REQUIRED_MESSAGE,
  }),
});

export default loginDTOValidation;
