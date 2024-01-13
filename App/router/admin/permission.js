const { PermissionController } = require("../../http/controllers/admin/RBAC/permission.controller copy");


const router = require("express").Router();

router.get('/all', PermissionController.getAllPermissions)
router.post('/add', PermissionController.addPermission)
router.delete('/remove/:id', PermissionController.removePermission)
router.patch('/update/:id', PermissionController.updatePermissionById)

module.exports = {
  AdminApiPermissionRoutes: router,
};
