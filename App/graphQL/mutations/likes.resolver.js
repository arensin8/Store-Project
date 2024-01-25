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

const LikeProduct = {
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
    const updateQuery = likedProduct
      ? { $pull: { likes: user._id } }
      : { $push: { likes: user._id } };
    await ProductModel.updateOne({ _id: productId }, updateQuery);
    let message;
    if (!likedProduct) {
      if (disLikedProduct)
        await ProductModel.updateOne(
          { _id: productId },
          { $pull: { dislike: user._id } }
        );
      message = "Like for product recorded successfully";
    } else message = "Like for product deleted successfully";
    return {
      statusCode: StatusCodes.CREATED,
      data: {
        message,
      },
    };
  },
};

const LikeCourse = {
  type: ResponseType,
  args: { courseId: { type: GraphQLString } },
  resolve: async (_, args, context) => {
    const { req } = context;
    const { courseId } = args;
    const user = await verifyAccessTokenInGraphQL(req);
    await checkExistsCourse(courseId);

    let likedCourse = await CoursesModel.findOne({
      _id: courseId,
      likes: user._id,
    });
    let dislikedCourse = await CoursesModel.findOne({
      _id: courseId,
      dislikes: user._id,
    });
    const updateQuery = likedCourse
      ? { $pull: { likes: user._id } }
      : { $push: { likes: user._id } };
    await CoursesModel.updateOne({ _id: courseId }, updateQuery);
    let message;
    if (!likedCourse) {
      if (dislikedCourse)
      await CoursesModel.updateOne(
        { _id: courseId },
        { $pull: { dislikes: user._id } }
      );
      message = "Like for course recorded successfully";
    } else message = "Like for course deleted successfully";
    return {
      statusCode: StatusCodes.CREATED,
      data: {
        message,
      },
    };
  },
};

const LikeBlog = {
  type: ResponseType,
  args: { blogId: { type: GraphQLString } },
  resolve: async (_, args, context) => {
    const { req } = context;
    const { blogId } = args;
    const user = await verifyAccessTokenInGraphQL(req);
    await checkExistsBlog(blogId);
    let likedBlog = await BlogsModel.findOne({
      _id: blogId,
      likes: user._id,
    });
    let dislikedBlog = await BlogsModel.findOne({
      _id: blogId,
      dislikes: user._id,
    });
    const updateQuery = likedBlog
      ? { $pull: { likes: user._id } }
      : { $push: { likes: user._id } };
    await BlogsModel.updateOne({ _id: blogId }, updateQuery);
    let message;
    if (!likedBlog) {
      if (dislikedBlog)
      await BlogsModel.updateOne(
        { _id: blogId },
        { $pull: { dislikes: user._id } }
      );
      message = "Like for blog recorded successfully";
    } else message = "Like for blog deleted successfully";
    return {
      statusCode: StatusCodes.CREATED,
      data: {
        message,
      },
    };
  },
};

module.exports = {
  LikeProduct,
  LikeBlog,
  LikeCourse,
};
