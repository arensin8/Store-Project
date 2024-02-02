const homeController = require("../../http/controllers/api/home.controller");
const {
  verifyAccessToken,
} = require("../../http/middlewares/verifyAccessToken");
const { ApiPayment } = require("./payment");
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
 *      parameters :
 *      -     in : header
 *            name : Accesstoken
 *            example : Bearer YourToken...
 *      responses:
 *          200 :
 *              description : success
 *          404:
 *              description : Not found!
 */
router.get("/", verifyAccessToken, homeController.indexPage);
router.use(ApiPayment);

module.exports = {
  HomeRoutes: router,
};
