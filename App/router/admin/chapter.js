const { ChapterController } = require("../../http/controllers/admin/course/chapter.controller");

const router = require("express").Router();

router.put("/add", ChapterController.addChapter);
router.get("/list/:courseID", ChapterController.chaptersOfCourse);
router.patch("/remove/:chapterID", ChapterController.removeChapterById);

module.exports = {
  AdminApiChapterRoutes: router,
};
