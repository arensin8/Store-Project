
const { AdminApiBlogRoutes } = require("./blog");
const { AdminApiCategoryRoutes } = require("./category");
const { AdminApiProductRoutes } = require("./product");
const router = require("express").Router();
/**
 * @swagger
 *      tags :
 *        -  name : Admin-Panel
 *           description : Admin actions(add,remove,edit ...)
 *        -  name : Product(AdminPanel)
 *           description : products management
 *        -  name : Blogs(AdminPanel)
 *           description : Blog management
 */

router.use("/category", AdminApiCategoryRoutes);
router.use("/products",  AdminApiProductRoutes);
router.use("/blogs",  AdminApiBlogRoutes);

module.exports = {
  AdminRoutes: router,
};
