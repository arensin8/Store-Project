const { GraphQLDirective, GraphQLString } = require("graphql");
const {
  verifyAccessTokenInGraphQL,
} = require("../../http/middlewares/verifyAccessToken");
const { ProductModel } = require("../../models/products");
const { ResponseType } = require("../typeDefs/public.types");
const { StatusCodes } = require("http-status-codes");
const { CoursesModel } = require("../../models/course");
const {
  checkExistsProduct,
  checkExistsCourse,
  checkExistsBlog,
} = require("../utils.graphql");
const { BlogsModel } = require("../../models/blogs");

const BookmarkProduct = {
  type: ResponseType,
  args: {
    productId: { type: GraphQLString },
  },
  resolve: async (_, args, context) => {
    const { req } = context;
    const { productId } = args;
    const user = await verifyAccessTokenInGraphQL(req);
    await checkExistsProduct(productId);

    let bookmarkedProduct = await ProductModel.findOne({
      _id: productId,
      bookmarks: user._id,
    });
    const updateQuery = bookmarkedProduct
      ? { $pull: { bookmarks: user._id } }
      : { $push: { bookmarks: user._id } };
    await ProductModel.updateOne({ _id: productId }, updateQuery);
    let message;
    if (!bookmarkedProduct) {
      message = "Product recorded in bookmarks list";
    } else message = "Product deleted from bookmarks list";
    return {
      statusCode: StatusCodes.OK,
      data: {
        message,
      },
    };
  },
};


const BookmarkBlog = {
  type: ResponseType,
  args: {
    blogId: { type: GraphQLString },
  },
  resolve: async (_, args, context) => {
    const { req } = context;
    const { blogId } = args;
    const user = await verifyAccessTokenInGraphQL(req);
    await checkExistsBlog(blogId);

    let bookmarkedBlog = await BlogsModel.findOne({
      _id: blogId,
      bookmarks: user._id,
    });
    const updateQuery = bookmarkedBlog
      ? { $pull: { bookmarks: user._id } }
      : { $push: { bookmarks: user._id } };
    await BlogsModel.updateOne({ _id: blogId }, updateQuery);
    let message;
    if (!bookmarkedBlog) {
      message = "Blog recorded in bookmarks list";
    } else message = "Blog deleted from bookmarks list";
    return {
      statusCode: StatusCodes.OK,
      data: {
        message,
      },
    };
  },
};


const BookmarkCourse = {
  type: ResponseType,
  args: {
    courseId: { type: GraphQLString },
  },
  resolve: async (_, args, context) => {
    const { req } = context;
    const { courseId } = args;
    const user = await verifyAccessTokenInGraphQL(req);
    await checkExistsCourse(courseId);

    let bookmarkedCourse = await CoursesModel.findOne({
      _id: courseId,
      bookmarks: user._id,
    });
    const updateQuery = bookmarkedCourse
      ? { $pull: { bookmarks: user._id } }
      : { $push: { bookmarks: user._id } };
    await CoursesModel.updateOne({ _id: courseId }, updateQuery);
    let message;
    if (!bookmarkedCourse) {
      message = "Course recorded in bookmarks list";
    } else message = "Course deleted from bookmarks list";
    return {
      statusCode: StatusCodes.OK,
      data: {
        message,
      },
    };
  },
};

module.exports = {
  BookmarkProduct,
  BookmarkCourse,
  BookmarkBlog,
};
