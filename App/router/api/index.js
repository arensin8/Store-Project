const homeController = require("../../http/controllers/api/home.controller");

const router = require("express").Router();

router.post("/", homeController.indexPage);

module.exports = {
    HomeRoutes : router
}