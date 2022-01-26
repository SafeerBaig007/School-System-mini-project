const Joi = require('joi')

const signupValidation = Joi.object({
    first_name : Joi.string().regex(/^[a-zA-Z]+$/).min(3).max(64).required(),
    last_name: Joi.string().regex(/^[a-zA-Z]+$/).min(3).max(64).required(),
    dob : Joi.date().greater('1-1-1970').required(),
    phone: Joi.number().required(),
    email: Joi.string().email().required(),
    password : Joi.string().min(6).max(64).required(),
    user_type: Joi.string().required(),
    school_id: Joi.number().required()
})

const loginValidation = Joi.object({
    email: Joi.string().email().required(),
})

module.exports = {
    signupValidation,
    loginValidation
}