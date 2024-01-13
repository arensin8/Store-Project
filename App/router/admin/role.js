const { RoleController } = require("../../http/controllers/admin/RBAC/role.controller");

const router = require("express").Router();

router.post('/add' , RoleController.addRole)
router.get('/all' , RoleController.getAllRoles)
router.delete('/remove/:field' , RoleController.removeRoleByIdOrTitle)

module.exports = {
  AdminApiRoleRoutes: router,
};
