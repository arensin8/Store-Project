const { BlogsModel } = require("../../../models/blogs");
const { deleteFileInPublic } = require("../../../utils/functions");
const { createBlogSchema } = require("../../validators/admin/blog.schema");
const Controller = require("../controller");
const path = require("path");
const createError = require("http-errors");

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
      const { id } = req.params;
      const blog = await this.findBlog(id);
      return res.status(200).json({
        data: {
          statusCode: 200,
          blog,
        },
      });
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
    const { id } = req.params;
    await this.findBlog(id);
    const result = await BlogsModel.deleteOne({ _id: id });
    if (result.deletedCount == 0)
      throw createError.InternalServerError("Delete failed");
    res.status(200).json({
      data: {
        statusCode: 200,
        message: "Deleted successfully",
      },
    });
    try {
    } catch (error) {
      next(error);
    }
  }
  async updateBlogById(req, res, next) {
    try {
      const { id } = req.params;
      await this.findBlog(id);
      if (req?.body?.fileUploadPath && req?.body?.filename) {
        req.body.image = path.join(req.body.fileUploadPath, req.body.filename);
        req.body.image = req.body.image.replace(/\\/g, "/");
      }
      const data = req.body;
      let nullishData = ["", " ", 0, "0", null, undefined];
      let blackListFields = ["comments", "likes", "dislikes", "bookmarks" , "author"];
      Object.keys(data).forEach((key) => {
        if (blackListFields.includes(key)) delete data[key];
        if (typeof data[key] == "string") data[key] = data[key].trim();
        if (nullishData.includes(data[key])) delete data[key];
        if (Array.isArray(data[key] && Array.length > 0))
          data[key] == data[key].map((item) => item.trim());
      });
      const updateResult = await BlogsModel.updateOne({_id : id },{$set : data});
      if(updateResult.modifiedCount == 0) throw createError.InternalServerError('Blog updating failed')

      return res.status(200).json({
        data: {
          statusCode: 200,
          message: "Blog updated successfully",
        },
      });
    } catch (error) {
      deleteFileInPublic(req?.body.image);
      next(error);
    }
  }
  async findBlog(id) {
    const blog = await BlogsModel.findById(id).populate([
      { path: "category" },
      {
        path: "author",
        // select: ["phone", "first_name", "last_name", "username"],
      },
    ]);
    if (!blog) return createError.NotFound("Blog not found");
    delete blog.category.children;
    return blog;
  }
}

module.exports = {
  BlogController: new BlogController(),
};
