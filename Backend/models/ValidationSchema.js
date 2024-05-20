const Joi = require('joi')

const joinuserSchema = Joi.object({
    name: Joi.string().alphanum().min(3).max(30).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required(),
    confiromPassword: Joi.string().min(8).required()
})


module.exports = {joinuserSchema}