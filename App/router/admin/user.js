const { UserController } = require('../../http/controllers/admin/user/user.controller');

const router = require('express').Router();

router.get('/all' , UserController.getAllUsers)
router.get('/profile' , UserController.userProfile)
router.patch('/update-profile' , UserController.updateUserProfile)


module.exports = {
    AdminApiUserRoutes : router
}