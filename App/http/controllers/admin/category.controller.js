const createError = require("http-errors");
const { CategoriesModel } = require("../../../models/categories");
const Controller = require("../controller");
const {
  addCategorySchema,
  updateCategorySchema,
} = require("../../validators/admin/category.schema");
const categories = require("../../../models/categories");
const { default: mongoose } = require("mongoose");

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
      const { id } = req.params;
      const category = await this.checkExistCategory(id);
      const deleteResult = await CategoriesModel.deleteMany({
        $or: [{ _id: category._id }, { parent: category._id }],
      });
      if (deleteResult.deletedCount == 0)
        throw createError.InternalServerError("deleting category failed");
      return res.status(200).json({
        data: {
          statusCode: 200,
          message: "Category deleted successfully",
        },
      });
    } catch (error) {
      next(error);
    }
  }
  async editCategoryTitle(req, res, next) {
    try {
      const { id } = req.params;
      const { title } = req.body;
      const category = this.checkExistCategory(id);
      await updateCategorySchema.validateAsync(req.body);
      const updateResult = await CategoriesModel.updateOne(
        { _id: id },
        { $set: { title: title } }
      );
      if (updateResult.modifiedCount == 0)
        throw createError.InternalServerError("failed to update");
      return res.status(200).json({
        data: {
          statusCode: 200,
          message: "updated successfully",
        },
      });
    } catch (error) {
      next(error);
    }
  }
  async getAllCategories(req, res, next) {
    try {
      // const category = await CategoriesModel.aggregate([
      //   {
      //     $lookup: {
      //       from: "categories",
      //       localField: "_id",
      //       foreignField: "parent",
      //       as: "children",
      //     },
      //   },
      //   {
      //     $graphLookup: {
      //       from: "categories",
      //       startWith: "$_id",
      //       connectFromField: "_id",
      //       connectToField: "parent",
      //       maxDepth: 5,
      //       depthField: "depth",
      //       as: "children",
      //     },
      //   },
      //   {
      //     $project: {
      //       __v: 0,
      //       "children.__v": 0,
      //       "children.parent": 0,
      //     },
      //   },
      //   {
      //     $match: {
      //       parent: undefined,
      //     },
      //   },
      // ]);
      const categories = await CategoriesModel.find(
        { parent: undefined },
        { __v: 0 }
      );
      return res.status(200).json({
        categories: {
          statusCode: 200,
          data: categories,
        },
      });
    } catch (error) {
      next(error);
    }
  }
  async getAllCategoriesWithoutPopulate(req, res, next) {
    try {
      const categories = await CategoriesModel.aggregate([{ $match: {} }]);
      res.status(200).json({
        data: {
          statusCode: 200,
          categories,
        },
      });
    } catch (error) {
      next(error);
    }
  }
  async getCategoryById(req, res, next) {
    try {
      const { id: _id } = req.params;
      const idToSearch = new mongoose.Types.ObjectId(_id);
      // const category = await CategoriesModel.aggregate([
      //   {
      //     $match: { _id: idToSearch },
      //   },
      //   {
      //     $lookup: {
      //       from: "categories",
      //       localField: "_id",
      //       foreignField: "parent",
      //       as: "children",
      //     },
      //   },
      //   {
      //     $project: {
      //       __v: 0,
      //       "children.__v": 0,
      //       "children.parent": 0,
      //     },
      //   },
      // ]);

      return res.status(200).json({
        data: {
          statusCode: 200,
          category,
        },
      });
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
        statusCode: 200,
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
        statusCode: 200,
        children,
      },
    });
    try {
    } catch (error) {
      next(error);
    }
  }
  async checkExistCategory(id) {
    const category = await CategoriesModel.findById(id);
    if (!category) throw createError.NotFound("category not found");
    return category;
  }
}

module.exports = {
  CategoryController: new CategoryController(),
};
