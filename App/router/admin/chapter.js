const { ChapterController } = require("../../http/controllers/admin/course/chapter.controller");

const router = require("express").Router();

router.put("/add", ChapterController.addChapter);
router.get("/list/:courseID", ChapterController.chaptersOfCourse);
router.patch("/remove/:chapterId", ChapterController.removeChapterById);
router.patch("/update/:chapterId", ChapterController.updateChapterById);

module.exports = {
  AdminApiChapterRoutes: router,
};
