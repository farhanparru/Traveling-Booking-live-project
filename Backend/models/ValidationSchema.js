const Joi = require('joi')

const joinUserSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    confirmPassword: Joi.string().valid(Joi.ref('password')).required().messages({
        'any.only': 'Password and confirm password do not match'
      })
    });


module.exports = joinUserSchema