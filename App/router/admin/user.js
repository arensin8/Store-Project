const { UserController } = require('../../http/controllers/admin/user/user.controller');

const router = require('express').Router();

router.get('/all' , UserController.getAllUsers)

module.exports = {
    AdminApiUserRoutes : router
}