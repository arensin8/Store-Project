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
const { PERMISSIONS } = require("../../utils/constant");
const router = require("express").Router();


router.use("/category", checkPermissions([PERMISSIONS.CONTENT_MANAGER]) ,AdminApiCategoryRoutes);
router.use("/products", checkPermissions([PERMISSIONS.SUPPLIER]) ,AdminApiProductRoutes);
router.use("/blogs", checkPermissions([PERMISSIONS.TEACHER]) ,AdminApiBlogRoutes);
router.use("/courses", checkPermissions([PERMISSIONS.TEACHER]) ,AdminApiCourseRoutes);
router.use("/chapters", checkPermissions([PERMISSIONS.TEACHER]) ,AdminApiChapterRoutes);
router.use("/episodes", checkPermissions([PERMISSIONS.TEACHER]) ,AdminApiEpisodeRoutes);
router.use("/users" ,AdminApiUserRoutes);
router.use("/roles",checkPermissions([PERMISSIONS.ADMIN]) , AdminApiRoleRoutes);
router.use("/permissions",checkPermissions([PERMISSIONS.ADMIN]) , AdminApiPermissionRoutes);

module.exports = {
  AdminRoutes: router,
};
