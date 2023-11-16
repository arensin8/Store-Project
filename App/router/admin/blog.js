const {
  BlogController,
} = require("../../http/controllers/admin/blog.controller");
const { stringToArray } = require("../../http/middlewares/stringToArray");
const { uploadFile } = require("../../utils/multer");

const router = require("express").Router();

/**
 * @swagger
 *  /admin/blogs:
 *      get :
 *            tags : [Blogs(AdminPanel)]
 *            summary : get all blogs
 *            responses:
 *                  200:
 *                      description : Success
 */
router.get("/", BlogController.getListOfBlogs);

/**
 * @swagger
 *  /admin/blogs/add:
 *      post :
 *            tags : [Blogs(AdminPanel)]
 *            summary : create a new blog
 *            consumes :
 *                -     multipart/form-data
 *            parameters :
 *            -   name : title
 *                in : formData
 *                required : true
 *                type : string
 *            -   name : text
 *                in : formData
 *                required : true
 *                type : string
 *            -   name : short_text
 *                in : formData
 *                required : true
 *                type : string
 *            -   name : tags
 *                example : tag1#tag2_foo#foo_bar || undefined || str
 *                in : formData
 *                type : string
 *            -   name : category
 *                in : formData
 *                required : false
 *                type : string
 *            -   name : image
 *                in : formData
 *                required : false
 *                type : file
 *            responses:
 *                  201:
 *                      description : Success
 */
router.post("/add", uploadFile.single('image'), stringToArray('tags'), BlogController.createBlog);
module.exports = {
  BlogAdminApiRoutes: router,
};
