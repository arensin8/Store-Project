const { AdminApiBlogRoutes } = require("./blog");
const { AdminApiCategoryRoutes } = require("./category");
const { AdminApiCourseRoutes } = require("./course");
const { AdminApiProductRoutes } = require("./product");
const { AdminApiChapterRoutes } = require("./chapter");
const { AdminApiEpisodeRoutes } = require("./episode");
const { AdminApiUserRoutes } = require("./user");
const { AdminApiRoleRoutes } = require("./role");
const { AdminApiPermissionRoutes } = require("./permission");
const { checkPermissions } = require("../../http/middlewares/permissions.guard");
const router = require("express").Router();


router.use("/category", AdminApiCategoryRoutes);
router.use("/products", AdminApiProductRoutes);
router.use("/blogs", AdminApiBlogRoutes);
router.use("/courses", AdminApiCourseRoutes);
router.use("/chapters", AdminApiChapterRoutes);
router.use("/episodes", AdminApiEpisodeRoutes);
router.use("/users", checkPermissions(['user']) ,AdminApiUserRoutes);
router.use("/roles", AdminApiRoleRoutes);
router.use("/permissions", AdminApiPermissionRoutes);

module.exports = {
  AdminRoutes: router,
};
