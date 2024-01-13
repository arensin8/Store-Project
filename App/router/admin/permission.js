const { PermissionController } = require("../../http/controllers/admin/RBAC/permission.controller copy");


const router = require("express").Router();

router.get('/all', PermissionController.getAllPermissions)
router.post('/add', PermissionController.addPermission)

module.exports = {
  AdminApiPermissionRoutes: router,
};
