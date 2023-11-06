const createError = require("http-errors");
const { CategoriesModel } = require("../../../models/categories");
const Controller = require("../controller");
const { addCategorySchema } = require("../../validators/admin/category.schema");

class CategoryController extends Controller {
  async addCategory(req, res, next) {
    try {
      await addCategorySchema.validateAsync(req.body);
      const { title, parent } = req.body;
      const category = await CategoriesModel.create({ title, parent });
      if (!category) throw createError.InternalServerError("internal error");
      return (
        res.status(201).
        json({
          data: {
            statusCode: 201,
            message: "category added successfully",
          },
        })
      );
    } catch (error) {
      next(error);
    }
  }
  removeCategory(req, res, next) {
    try {
    } catch (error) {
      next(error);
    }
  }
  editCategory(req, res, next) {
    try {
    } catch (error) {
      next(error);
    }
  }
  getAllCategories(req, res, next) {
    try {
    } catch (error) {
      next(error);
    }
  }
  getCategoryById(req, res, next) {
    try {
    } catch (error) {
      next(error);
    }
  }
  getAllParents(req, res, next) {
    try {
    } catch (error) {
      next(error);
    }
  }
  getChildOfParents(req, res, next) {
    try {
    } catch (error) {
      next(error);
    }
  }
}

module.exports = {
  CategoryController: new CategoryController(),
};
