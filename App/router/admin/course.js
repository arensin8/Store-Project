const {
  CourseController,
} = require("../../http/controllers/admin/course/course.controller");
const { stringToArray } = require("../../http/middlewares/stringToArray");
const { uploadFile } = require("../../utils/multer");

const router = require("express").Router();

router.post(
  "/add",
  uploadFile.single("image"),
  stringToArray("tags"),
  CourseController.addCourse
);
router.get("/all", CourseController.getAllCourses);
router.get("/:id", CourseController.getCourseById);
router.patch(
  "/update/:id",
  uploadFile.single("image"),
  stringToArray("tags"),
  CourseController.updateCourse
);
// router.post()
// router.delete()
// router.put()
// router.get()

module.exports = {
  AdminApiCourseRoutes: router,
};
