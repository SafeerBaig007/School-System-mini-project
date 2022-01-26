const Joi = require('joi');

const registrationValidation = Joi.object({
    name : Joi.string().min(3).max(64).required(),
    address: Joi.string().min(3).max(64).required()
})


module.exports ={
    registrationValidation
}