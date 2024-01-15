const { UserController } = require('../../http/controllers/admin/user/user.controller');
const { checkPermissions } = require('../../http/middlewares/permissions.guard');
const { PERMISSIONS } = require('../../utils/constant');

const router = require('express').Router();

router.get('/all' ,checkPermissions([PERMISSIONS.ADMIN]), UserController.getAllUsers)
router.get('/profile' , checkPermissions([]) , UserController.userProfile)
router.patch('/update-profile' , UserController.updateUserProfile)


module.exports = {
    AdminApiUserRoutes : router
}