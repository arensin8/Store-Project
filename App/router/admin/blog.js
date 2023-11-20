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
 *            parameters :
 *            -   name : accesstoken
 *                in : header
 *                example : Bearer token...
 *                value : Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwaG9uZSI6IjA5NTE2NzI0NSIsImlhdCI6MTcwMDQyMDQ1NywiZXhwIjoxNzAwNTA2ODU3fQ.REc4UQgejTChMUosHuWNB7xZGWdeow1ZJ4pXgw4SulA
 *                required : true
 *                type : string
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
 *            -   name : accesstoken
 *                in : header
 *                example : Bearer token...
 *                value : Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwaG9uZSI6IjA5NTE2NzI0NSIsImlhdCI6MTcwMDQyMDQ1NywiZXhwIjoxNzAwNTA2ODU3fQ.REc4UQgejTChMUosHuWNB7xZGWdeow1ZJ4pXgw4SulA
 *                required : true
 *                type : string
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
 *                required : true
 *                type : string
 *            -   name : image
 *                in : formData
 *                required : false
 *                type : file
 *            responses:
 *                  201:
 *                      description : Created
 */
router.post(
  "/add",
  uploadFile.single("image"),
  stringToArray("tags"),
  BlogController.createBlog
);

/**
 * @swagger
 *  /admin/blogs/{id}:
 *      get :
 *            tags : [Blogs(AdminPanel)]
 *            summary : get blog by id and populate fields
 *            parameters :
 *            -   name : accesstoken
 *                in : header
 *                example : Bearer token...
 *                value : Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwaG9uZSI6IjA5NTE2NzI0NSIsImlhdCI6MTcwMDQyMDQ1NywiZXhwIjoxNzAwNTA2ODU3fQ.REc4UQgejTChMUosHuWNB7xZGWdeow1ZJ4pXgw4SulA
 *                required : true
 *                type : string
 *            -   name : id
 *                in : path
 *                required : true
 *                type : string
 *            responses:
 *                  200:
 *                      description : Success
 */
router.get("/:id", BlogController.getBlogById);

/**
 * @swagger
 *  /admin/blogs/{id}:
 *      delete :
 *            tags : [Blogs(AdminPanel)]
 *            summary : delete blog by id and populate fields
 *            parameters :
 *            -   name : accesstoken
 *                in : header
 *                example : Bearer token...
 *                value : Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwaG9uZSI6IjA5NTE2NzI0NSIsImlhdCI6MTcwMDQyMDQ1NywiZXhwIjoxNzAwNTA2ODU3fQ.REc4UQgejTChMUosHuWNB7xZGWdeow1ZJ4pXgw4SulA
 *                required : true
 *                type : string
 *            -   name : id
 *                in : path
 *                required : true
 *                type : string
 *            responses:
 *                  200:
 *                      description : Success
 */
router.delete("/:id", BlogController.deleteBlogById);
module.exports = {
  BlogAdminApiRoutes: router,
};
