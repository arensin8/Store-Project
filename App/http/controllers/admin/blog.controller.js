const { BlogsModel } = require("../../../models/blogs");
const { deleteFileInPublic } = require("../../../utils/functions");
const { createBlogSchema } = require("../../validators/admin/blog.schema");
const Controller = require("../controller");
const path = require("path");

class BlogController extends Controller {
  async createBlog(req, res, next) {
    try {
      const blogDataBody = await createBlogSchema.validateAsync(req.body);

      req.body.image = path.join(
        blogDataBody.fileUploadPath,
        blogDataBody.filename
      );
      req.body.image = req.body.image.replace(/\\/g, "/");
      const { title, text, short_text, category, tags } = blogDataBody;
      const image = req.body.image;
      const author = req.user._id;
      const blog = await BlogsModel.create({
        title,
        image,
        text,
        short_text,
        category,
        tags,
        author,
      });
      return res.status(201).json({
        data: {
          statusCode: 201,
          message: "Blog created successfully",
        },
      });
    } catch (error) {
      deleteFileInPublic(req.body.image);
      next(error);
    }
  }
  async getBlogById(req, res, next) {
    try {
    } catch (error) {
      next(error);
    }
  }
  async getListOfBlogs(req, res, next) {
    try {
      const blogs = await BlogsModel.aggregate([
        { $match: {} },
        {
          $lookup: {
            from: "users",
            foreignField: "_id",
            localField: "author",
            as: "author",
          },
        },
        { $unwind: "$author" },

        {
          $lookup: {
            from: "categories",
            foreignField: "_id",
            localField: "category",
            as: "category",
          },
        },
        { $unwind: "$category" },

        {
          $project: {
            "author.__v": 0,
            "category.__v": 0,
            "author.roles": 0,
            "author.discount": 0,
            "author.bills": 0,
            "author.otp": 0,
          },
        },
      ]);
      return res.status(200).json({
        data: {
          statusCode: 200,
          blogs,
        },
      });
    } catch (error) {
      next(error);
    }
  }
  async getCommentsOfBlog(req, res, next) {
    try {
    } catch (error) {
      next(error);
    }
  }
  async deleteBlogById(req, res, next) {
    try {
    } catch (error) {
      next(error);
    }
  }
  async updateBlogById(req, res, next) {
    try {
    } catch (error) {
      next(error);
    }
  }
}

module.exports = {
  BlogController: new BlogController(),
};
