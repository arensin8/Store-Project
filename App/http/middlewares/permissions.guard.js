const { PermissionsModel } = require("../../models/permission");
const { RoleModel } = require("../../models/role");

function checkPermissions(requiredPermissions = []) {
    return async function (req, res, next) {
      try {
        const user = req.user;
        const role = await RoleModel.findOne({title : user.role})
        const permissions = await PermissionsModel.find({_id : {$in : role.permissions}})
        const userPermissions = permissions.map(permission => permission.name)
        console.log(requiredPermissions);
        console.log(userPermissions);
        const hasPermission = requiredPermissions.every(permission => {
            return userPermissions.includes(permission)
        })
        if (requiredPermissions.length == 0 || hasPermission) return next();
        throw createError.Forbidden(`You don't have access to this section`);
      } catch (error) {
        next(error);
      }
    };
  }

  module.exports = {
    checkPermissions
  }