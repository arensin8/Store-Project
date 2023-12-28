const {
  BlogController,
} = require("../../http/controllers/admin/blog.controller");
const { stringToArray } = require("../../http/middlewares/stringToArray");
const { uploadFile } = require("../../utils/multer");

const router = require("express").Router();



router.get("/", BlogController.getListOfBlogs);
router.post("/add",uploadFile.single("image"),stringToArray("tags"),BlogController.createBlog);
router.get("/:id", BlogController.getBlogById);
router.patch("/update/:id",uploadFile.single("image"),stringToArray("tags"),BlogController.updateBlogById);
router.delete("/:id", BlogController.deleteBlogById);

module.exports = {
  AdminApiBlogRoutes: router,
};
