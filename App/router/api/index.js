const homeController = require("../../http/controllers/api/home.controller");
const router = require("express").Router();

/**
 * @swagger
 * tags :
 *  name : IndexPage
 *  description : Index page route and data
 */

/**
 * @swagger
 * /:
 *  get:
 *      summary :  index of routes
 *      tags : [IndexPage]
 *      description : Gets all needed data
 *      responses:
 *          200 : 
 *              description : success
 *          404:
 *              description : Not found!
 */
router.get("/", homeController.indexPage);

module.exports = {
  HomeRoutes: router,
};
