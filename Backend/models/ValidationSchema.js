const Joi = require('joi')
const passwordComplex = require('joi-password-complexity')

const joinUserSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password:passwordComplex().required().label('password'),
    confirmPassword: Joi.string().valid(Joi.ref('password')).required().messages({
        'any.only': 'Password and confirm password do not match'
      })
    });

    const refreshTokenBodyvalidation = (body)=>{
      const schema = Joi.object({
         refreshToken:Joi.string().required().label('Refresh Token')
      })
      return schema.validate(body)
    }


module.exports = joinUserSchema,refreshTokenBodyvalidation