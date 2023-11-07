const createError = require("http-errors");
const { CategoriesModel } = require("../../../models/categories");
const Controller = require("../controller");
const { addCategorySchema } = require("../../validators/admin/category.schema");
const categories = require("../../../models/categories");

class CategoryController extends Controller {
  async addCategory(req, res, next) {
    try {
      await addCategorySchema.validateAsync(req.body);
      const { title, parent } = req.body;
      const category = await CategoriesModel.create({ title, parent });
      if (!category) throw createError.InternalServerError("internal error");
      return res.status(201).json({
        data: {
          statusCode: 201,
          message: "category added successfully",
        },
      });
    } catch (error) {
      next(error);
    }
  }
  async removeCategory(req, res, next) {
    try {
      const {id} = req.params;
      const category = await this.checkExistCategory(id);
      const deleteResult = await CategoriesModel.deleteOne({_id : category._id})
      if(deleteResult.deletedCount == 0) throw createError.InternalServerError('deleting category failed')
      return res.status(200).json({
    data : {
      statusCode : 200,
      message : 'Category deleted successfully'
    }
      })
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
  async getAllCategories(req, res, next) {
    const category = await CategoriesModel.aggregate([
      {
        $lookup: {
          from: "categories",
          localField: "_id",
          foreignField: "parent",
          as: "children",
        },
      },
      {
        $project: {
          __v: 0,
          "children.__v": 0,
          "children.parent": 0,
        },
      },
    ]);
    return res.status(200).json({
      statusCode : 200,
      data: category,
    });
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
  async getAllParents(req, res, next) {
    try {
      const parents = await CategoriesModel.find(
        { parent: undefined },
        { __v: 0 }
      );
      return res.status(200).json({
        statusCode : 200,
        parents,
      });
    } catch (error) {
      next(error);
    }
  }
  async getChildOfParents(req, res, next) {
    const { parent } = req.params;
    const children = await CategoriesModel.find(
      { parent: parent },
      { __v: 0, parent: 0 }
    );
    return res.status(200).json({
      
      data: {
        statusCode : 200,
        children,
      },
    });
    try {
    } catch (error) {
      next(error);
    }
  }
  async checkExistCategory(id){
    const category = await CategoriesModel.findById(id)
    if(!category) throw createError.NotFound('category not found')
    return category
  }
}

module.exports = {
  CategoryController: new CategoryController(),
};
