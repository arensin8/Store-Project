const Joi = require("@hapi/joi");
const { mongoIdPattern } = require("../../../utils/constant");

const addRoleSchema = Joi.object({
  title: Joi.string().min(3).max(30).error(new Error("Role title is incorrect")),
  permissions: Joi.array().items(Joi.string().regex(mongoIdPattern) ).error(new Error("Entered permissions are incorrect!")),
  description: Joi.allow(),
});

const addPermissionSchema = Joi.object({
  name: Joi.string().min(3).max(30).error(new Error("Permission name is incorrect")),
  description: Joi.string().min(0).max(100).error(new Error("Permission desc is incorrect")),
});


module.exports = {
    addRoleSchema,
    addPermissionSchema
};
