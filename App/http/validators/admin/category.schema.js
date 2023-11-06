const Joi = require('@hapi/joi');
const { mongoIdPattern } = require('../../../utils/constans');

const addCategorySchema = Joi.object({
        title : Joi.string().min(3).max(30).error( new Error('Category title is incorrect')),
        parent : Joi.string().pattern(mongoIdPattern).allow('').error( new Error('Id is Incorrect')),
})


module.exports = {
        addCategorySchema
}

