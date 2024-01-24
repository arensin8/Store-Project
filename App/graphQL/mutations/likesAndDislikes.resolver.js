const { GraphQLDirective, GraphQLString } = require("graphql");
const {
  verifyAccessTokenInGraphQL,
} = require("../../http/middlewares/verifyAccessToken");
const { ProductModel } = require("../../models/products");
const { ResponseType } = require("../typeDefs/public.types");
const { StatusCodes } = require("http-status-codes");

const LikeProduct = {
  type: ResponseType,
  args: {
    productId: { type: GraphQLString },
  },
  resolve: async (_, args, context) => {
    const { req } = context;
    const { productId } = args;
    const user = await verifyAccessTokenInGraphQL(req);
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
    if (disLikedProduct && !likedProduct) {
      await ProductModel.updateOne(
        { _id: productId },
        { $pull: { dislikes: user._id } }
      );
    }
    return {
      statusCode: StatusCodes.CREATED,
      data: {
        message : 'Like for product recorded successfully'
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
  },
};

const LikeBlog = {
  type: ResponseType,
  args: { blogId: { type: GraphQLString } },
  resolve: async (_, args, context) => {
    const { req } = context;
    const { blogId } = args;
    const user = await verifyAccessTokenInGraphQL(req);
  },
};

module.exports = {
  LikeProduct,
};
