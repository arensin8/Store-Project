const { AdminApiBlogRoutes } = require("./blog");
const { AdminApiCategoryRoutes } = require("./category");
const { AdminApiCourseRoutes } = require("./course");
const { AdminApiProductRoutes } = require("./product");
const { AdminApiChapterRoutes } = require("./chapter");
const { AdminApiEpisodeRoutes } = require("./episode");
const router = require("express").Router();


router.use("/category", AdminApiCategoryRoutes);
router.use("/products", AdminApiProductRoutes);
router.use("/blogs", AdminApiBlogRoutes);
router.use("/courses", AdminApiCourseRoutes);
router.use("/chapters", AdminApiChapterRoutes);
router.use("/episodes", AdminApiEpisodeRoutes);

module.exports = {
  AdminRoutes: router,
};
