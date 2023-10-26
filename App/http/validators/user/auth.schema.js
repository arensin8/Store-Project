const Joi = require('@hapi/joi');

const getOptSchema = Joi.object({
        phone : Joi.string().length(9).pattern(/^0[0-9]{8}$/).error( new Error('Mobile number is incorrect'))
})

const checkOptSchema = Joi.object({
        phone : Joi.string().length(9).pattern(/^0[0-9]{8}$/).error( new Error('Mobile number is incorrect')),
        code : Joi.string().min(4).max(6).error( new Error('your code is incorrect'))
})
module.exports = {
        getOptSchema ,checkOptSchema
}

