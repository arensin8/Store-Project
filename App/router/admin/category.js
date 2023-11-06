const {
  CategoryController,
} = require("../../http/controllers/admin/category.controller");

const router = require("express").Router();

/**
 * @swagger
 *  /admin/category/add:
 *      post :
 *            tags : [Admin-Panel]
 *            summary : create new category title
 *            parameters :
 *            -   name : title
 *                in : formData
 *                required : true
 *                type : string
 *            -   name : parent
 *                in : formData
 *                required : false
 *                type : string
 *            responses:
 *                  201:
 *                      description : Success
 */
router.post("/add", CategoryController.addCategory);

module.exports = {
  CategoryRoutes: router,
};
