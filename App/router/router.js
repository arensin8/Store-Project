const router = require("express").Router();
const { verifyAccessToken, checkRole } = require("../http/middlewares/verifyAccessToken");
const { AdminRoutes } = require("./admin/admin.routes");
const { AdminApiProductRoutes } = require("./admin/product");
const { HomeRoutes } = require("./api");
const { DeveloperRoutes } = require("./developer.routes");

const { UserAuthRoutes } = require("./user/auth");

router.use("/user", UserAuthRoutes);
router.use("/admin", verifyAccessToken ,  AdminRoutes);
router.use("/developer", DeveloperRoutes);
router.use("/", HomeRoutes);
module.exports = {
  AllRoutes: router,
};
