const createHttpError = require("http-errors");
const { PermissionsModel } = require("../../models/permission");
const { RoleModel } = require("../../models/role");
const { PERMISSIONS } = require("../../utils/constant");

function checkPermissions(requiredPermissions = []) {
    return async function (req, res, next) {
      try {
        const allPermissions = requiredPermissions.flat(2)
        const user = req.user;
        const role = await RoleModel.findOne({title : user.role})
        const permissions = await PermissionsModel.find({_id : {$in : role.permissions}})
        const userPermissions = permissions.map(permission => permission.name)
        const hasPermission = allPermissions.every(permission => {
            return userPermissions.includes(permission)
        })
        if(userPermissions.includes(PERMISSIONS.ALL)) return next()
        if (allPermissions.length == 0 || hasPermission) return next();
        throw createHttpError.Forbidden(`You don't have access to this section`);
      } catch (error) {
        next(error);
      }
    };
  }

  module.exports = {
    checkPermissions
  }