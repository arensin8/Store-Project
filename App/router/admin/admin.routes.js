const { CategoryRoutes } = require("./category");
const router = require("express").Router();
/**
 * @swagger
 *      tags :
 *          name : Admin-Panel
 *          description : Admin actions(add,remove,edit ...)
 */

router.use("/category", CategoryRoutes);

module.exports = {
  AdminRoutes: router,
};
