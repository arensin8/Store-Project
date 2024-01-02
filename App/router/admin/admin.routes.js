const { AdminApiBlogRoutes } = require("./blog");
const { AdminApiCategoryRoutes } = require("./category");
const { AdminApiCourseRoutes } = require("./course");
const { AdminApiProductRoutes } = require("./product");
const { AdminApiChapterRoutes } = require("./chapter");
const router = require("express").Router();
/**
 * @swagger
 *      tags :
 *        -  name : Admin-Panel
 *           description : Admin actions(add,remove,edit ...)
 *        -  name : Product(AdminPanel)
 *           description : products management
 *        -  name : Course(AdminPanel)
 *           description : Courses management
 *        -  name : Chapter(AdminPanel)
 *           description : Courses management
 *        -  name : Blogs(AdminPanel)
 *           description : Blog management
 */

router.use("/category", AdminApiCategoryRoutes);
router.use("/products", AdminApiProductRoutes);
router.use("/blogs", AdminApiBlogRoutes);
router.use("/courses", AdminApiCourseRoutes);
router.use("/chapters", AdminApiChapterRoutes);

module.exports = {
  AdminRoutes: router,
};
