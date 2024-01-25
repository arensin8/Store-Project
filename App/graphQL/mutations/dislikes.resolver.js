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

const DisLikeProduct = {
  type: ResponseType,
  args: {
    productId: { type: GraphQLString },
  },
  resolve: async (_, args, context) => {
    const { req } = context;
    const { productId } = args;
    const user = await verifyAccessTokenInGraphQL(req);
    await checkExistsProduct(productId);

    let likedProduct = await ProductModel.findOne({
      _id: productId,
      likes: user._id,
    });
    let disLikedProduct = await ProductModel.findOne({
      _id: productId,
      dislikes: user._id,
    });
    const updateQuery = disLikedProduct
      ? { $pull: { dislikes: user._id } }
      : { $push: { dislikes: user._id } };
    await ProductModel.updateOne({ _id: productId }, updateQuery);
    let message;
    if (!disLikedProduct) {
      if (likedProduct)
        await ProductModel.updateOne(
          { _id: productId },
          { $pull: { like: user._id } }
        );
      message = "DisLike for product recorded successfully";
    } else message = "DisLike for product deleted successfully";
    return {
      statusCode: StatusCodes.CREATED,
      data: {
        message,
      },
    };
  },
};

const DisLikeCourse = {
  type: ResponseType,
  args: {
    courseId: { type: GraphQLString },
  },
  resolve: async (_, args, context) => {
    const { req } = context;
    const { courseId } = args;
    const user = await verifyAccessTokenInGraphQL(req);
    await checkExistsCourse(courseId);

    let likedCourse = await CoursesModel.findOne({
      _id: courseId,
      likes: user._id,
    });
    let disLikedCourse = await CoursesModel.findOne({
      _id: courseId,
      dislikes: user._id,
    });
    const updateQuery = disLikedCourse
      ? { $pull: { dislikes: user._id } }
      : { $push: { dislikes: user._id } };
    await CoursesModel.updateOne({ _id: courseId }, updateQuery);
    let message;
    if (!disLikedCourse) {
      if (likedCourse)
        await CoursesModel.updateOne(
          { _id: courseId },
          { $pull: { like: user._id } }
        );
      message = "DisLike for course recorded successfully";
    } else message = "DisLike for course deleted successfully";
    return {
      statusCode: StatusCodes.CREATED,
      data: {
        message,
      },
    };
  },
};

const DisLikeBlog = {
  type: ResponseType,
  args: {
    blogId: { type: GraphQLString },
  },
  resolve: async (_, args, context) => {
    const { req } = context;
    const { blogId } = args;
    const user = await verifyAccessTokenInGraphQL(req);
    await checkExistsBlog(blogId);

    let likedBlog = await BlogsModel.findOne({
      _id: blogId,
      likes: user._id,
    });
    let disLikedBlog = await BlogsModel.findOne({
      _id: blogId,
      dislikes: user._id,
    });
    const updateQuery = disLikedBlog
      ? { $pull: { dislikes: user._id } }
      : { $push: { dislikes: user._id } };
    await BlogsModel.updateOne({ _id: blogId }, updateQuery);
    let message;
    if (!disLikedBlog) {
      if (likedBlog)
        await BlogsModel.updateOne(
          { _id: blogId },
          { $pull: { like: user._id } }
        );
      message = "DisLike for blog recorded successfully";
    } else message = "DisLike for blog deleted successfully";
    return {
      statusCode: StatusCodes.CREATED,
      data: {
        message,
      },
    };
  },
};

module.exports = {
  DisLikeProduct,
  DisLikeCourse,
  DisLikeBlog
};
