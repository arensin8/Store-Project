const { GraphQLString, GraphQLInt } = require("graphql");

const { ProductModel } = require("../../models/products");
const { ResponseType } = require("../typeDefs/public.types");
const { StatusCodes } = require("http-status-codes");
const { checkExistsProduct, checkExistsCourse } = require("../utils.graphql");
const { UserModel } = require("../../models/users");
const { copyObject } = require("../../utils/functions");
const {
  verifyAccessTokenInGraphQL,
} = require("../../http/middlewares/verifyAccessToken");

const AddProductToBasket = {
  type: ResponseType,
  args: {
    productId: { type: GraphQLString },
  },
  resolve: async (_, args, context) => {
    const { req } = context;
    const { productId } = args;
    const user = await verifyAccessTokenInGraphQL(req);
    await checkExistsProduct(productId);
    const product = await findProductInBasket(user._id, productId);
    if (product) {
      await UserModel.updateOne(
        { _id: user._id, "basket.products.productId": productId },
        {
          $inc: { "basket.products.$.count": 1 },
        }
      );
    } else {
      await UserModel.updateOne(
        { _id: user._id },
        {
          $push: { "basket.products": { productId, count: 1 } }, // Fix here
        }
      );
    }

    return {
      statusCode: StatusCodes.OK,
      data: {
        message: "Product added to basket successfully",
      },
    };
  },
};


const AddCourseToBasket = {
  type: ResponseType,
  args: {
    courseId: { type: GraphQLString },
    count: { type: GraphQLInt },
  },
  resolve: async (_, args, context) => {
    const { req } = context;
    const { courseId, count } = args;
    await checkExistsCourse(courseId);
  },
};

const RemoveProductToBasket = {
  type: ResponseType,
  args: {
    courseId: { type: GraphQLString },
  },
  resolve: async (_, args, context) => {
    const { req } = context;
    const { courseId } = args;
    await checkExistsProduct(courseId);
  },
};

const RemoveCourseToBasket = {
  type: ResponseType,
  args: {
    courseId: { type: GraphQLString },
  },
  resolve: async (_, args, context) => {
    const { req } = context;
    const { courseId } = args;
    await checkExistsCourse(courseId);
  },
};

async function findProductInBasket(userId, productId) {
  const basketProduct = await UserModel.findOne(
    { _id: userId, "basket.products.productId": productId },
    {
      "basket.products.$": 1,
    }
  );
  
  if (basketProduct && basketProduct.basket && basketProduct.basket.products) {
    const product = copyObject(basketProduct);
    return product.basket.products[0];
  }
  
  return null;
}


module.exports = {
  AddCourseToBasket,
  AddProductToBasket,
  RemoveCourseToBasket,
  RemoveProductToBasket,
};
