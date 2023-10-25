const Joi = require('@hapi/joi');
const { error } = require('@hapi/joi/lib/base');

const authSchema = Joi.object({
        phone : Joi.string().length(9).pattern(/^0[0-9]{8}$/).error( new Error('Mobile number is incorrect'))
})
module.exports = {
        authSchema
}

