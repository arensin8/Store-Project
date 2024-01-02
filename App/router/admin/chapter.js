const {
  CategoryController,
} = require("../../http/controllers/admin/category/category.controller");
const { ChapterController } = require("../../http/controllers/admin/course/chapter.controller");

const router = require("express").Router();

router.put("/add", ChapterController.addChapter);
router.get("/list/:courseID", ChapterController.chaptersOfCourse);

module.exports = {
  AdminApiChapterRoutes: router,
};
