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
/**
 * @swagger
 *  /admin/category/parents:
 *      get :
 *            tags : [Admin-Panel]
 *            summary : Get all parents of categories
 *            responses:
 *                  200:
 *                      description : Success
 */
router.get("/parents", CategoryController.getAllParents);

/**
 * @swagger
 *  /admin/category/children/{parent} :
 *      get :
 *            tags : [Admin-Panel]
 *            summary : Get all children of parent
 *            parameters:
 *                -    in : path
 *                     type : string
 *                     name: parent
 *                     required: true
 *            responses:
 *                  200:
 *                      description : Success
 */
router.get("/children/:parent", CategoryController.getChildOfParents);


/**
 * @swagger
 *  /admin/category/all :
 *      get :
 *            tags : [Admin-Panel]
 *            summary : Get all categories
 *            responses:
 *                  200:
 *                      description : Success
 */
router.get("/all", CategoryController.getAllCategories);

/**
 * @swagger
 *  /admin/category/remove/{id} :
 *      delete :
 *            tags : [Admin-Panel]
 *            summary : remove category by object-id
 *            parameters:
 *                -    in : path
 *                     type : string
 *                     name: id
 *                     required: true
 *            responses:
 *                  200:
 *                      description : Success
 */
router.delete("/remove/:id", CategoryController.removeCategory);

/**
 * @swagger
 *  /admin/category/{id} :
 *      get :
 *            tags : [Admin-Panel]
 *            summary : Get category by objet-id
 *            parameters:
 *                -    in : path
 *                     type : string
 *                     name: id
 *                     required: true
 *            responses:
 *                  200:
 *                      description : Success
 */
router.get("/:id", CategoryController.getCategoryById);

module.exports = {
  CategoryRoutes: router,
};
