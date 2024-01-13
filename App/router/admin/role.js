const { RoleController } = require("../../http/controllers/admin/RBAC/role.controller");
const { stringToArray } = require("../../http/middlewares/stringToArray");

const router = require("express").Router();

router.post('/add' ,stringToArray('permissions'), RoleController.addRole)
router.get('/all' , RoleController.getAllRoles)
router.delete('/remove/:field' , RoleController.removeRoleByIdOrTitle)
router.patch('/update/:id' ,stringToArray('permissions'), RoleController.updateRoleById)

module.exports = {
  AdminApiRoleRoutes: router,
};
