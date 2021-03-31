import joi from 'joi';

export default joi.object({
  email: joi.string().trim().empty().min(4).lowercase().email({ tlds: { allow: false } }).required(),
  password: joi.string().empty().min(4).required()
});