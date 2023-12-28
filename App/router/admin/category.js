const {
  CategoryController,
} = require("../../http/controllers/admin/category.controller");

const router = require("express").Router();


router.post("/add", CategoryController.addCategory);
router.get("/all", CategoryController.getAllCategories);
router.get("/list-of-all", CategoryController.getAllCategoriesWithoutPopulate);
router.get("/:id", CategoryController.getCategoryById);
router.get("/parents", CategoryController.getAllParents);
router.get("/children/:parent", CategoryController.getChildOfParents);
router.patch("/update/:id", CategoryController.editCategoryTitle);
router.delete("/remove/:id", CategoryController.removeCategory);


module.exports = {
  AdminApiCategoryRoutes: router,
};
