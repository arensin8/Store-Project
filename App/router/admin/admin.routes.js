const { verifyAccessToken } = require("../../http/middlewares/verifyAccessToken");
const { BlogAdminApiRoutes } = require("./blog");
const { CategoryRoutes } = require("./category");
const router = require("express").Router();
/**
 * @swagger
 *      tags :
 *          name : Admin-Panel
 *          description : Admin actions(add,remove,edit ...)
 *          name : Blogs(AdminPanel)
 *          description : Blog management
 */

router.use("/category", CategoryRoutes);
router.use("/blogs", verifyAccessToken , BlogAdminApiRoutes);

module.exports = {
  AdminRoutes: router,
};
