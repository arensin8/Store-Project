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
const createHttpError = require("http-errors");

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
  },
  resolve: async (_, args, context) => {
    const { req } = context;
    const { courseId } = args;
    const user = await verifyAccessTokenInGraphQL(req);
    await checkExistsCourse(courseId);
    const course = await findCourseInBasket(user._id, courseId);
    if (course) {
      await UserModel.updateOne(
        { _id: user._id, "basket.courses.courseId": courseId },
        {
          $inc: { "basket.courses.$.count": 1 },
        }
      );
    } else {
      await UserModel.updateOne(
        { _id: user._id },
        {
          $push: { "basket.courses": { courseId, count: 1 } },
        }
      );
    }

    return {
      statusCode: StatusCodes.OK,
      data: {
        message: "course added to basket successfully",
      },
    };
  },
};

const RemoveProductInBasket = {
  type: ResponseType,
  args: {
    productId: { type: GraphQLString },
  },
  resolve: async (_, args, context) => {
    const { req } = context;
    const { productId } = args;
    await checkExistsProduct(productId);
    const user = await verifyAccessTokenInGraphQL(req);
    const product = await findProductInBasket(user._id, productId);
    let message;

    if (!product)
      throw new createHttpError.NotFound("Product not found in the basket!");

    if (product.count > 1) {
      await UserModel.updateOne(
        { _id: user._id, "basket.products.productId": productId },
        {
          $inc: { "basket.products.$.count": -1 },
        }
      );
      message = "Product deleted from basket (single)";
    } else {
      await UserModel.updateOne(
        { _id: user._id },
        {
          $pull: { "basket.products": { productId } },
        }
      );
      message = "Product deleted in basket successfully";
    }

    return {
      statusCode: StatusCodes.OK,
      data: {
        message,
      },
    };
  },
};

const RemoveCourseInBasket = {
  type: ResponseType,
  args: {
    courseId: { type: GraphQLString },
  },
  resolve: async (_, args, context) => {
    const { req } = context;
    const { courseId } = args;
    await checkExistsCourse(courseId);
    const user = await verifyAccessTokenInGraphQL(req);
    const course = await findCourseInBasket(user._id, courseId);
    let message;
    if (!course)
      throw new createHttpError.NotFound("Course not found in the basket!");
    if (course.count > 1) {
      await UserModel.updateOne(
        { _id: user._id, "basket.courses.courseId": courseId },
        {
          $inc: { "basket.courses.$.count": -1 },
        }
      );
      message = "Course deleted from basket(single)";
    } else {
      await UserModel.updateOne(
        { _id: user._id, "basket.courses.courseId": courseId },
        {
          $pull: { "basket.courses": { courseId } },
        }
      );
      message = "Course deleted in basket successfully";
    }

    return {
      statusCode: StatusCodes.OK,
      data: {
        message,
      },
    };
  },
};

async function findProductInBasket(userId, productId) {
  const findResult = await UserModel.findOne(
    { _id: userId, "basket.products.productId": productId },
    {
      "basket.products.$": 1,
    }
  );

  if (findResult && findResult.basket && findResult.basket.products) {
    const userDetails = copyObject(findResult);
    return userDetails.basket.products[0];
  }

  return null;
}

async function findCourseInBasket(userId, courseId) {
  const findResult = await UserModel.findOne(
    { _id: userId, "basket.courses.courseId": courseId },
    {
      "basket.courses.$": 1,
    }
  );

  if (findResult && findResult.basket && findResult.basket.courses) {
    const userDetails = copyObject(findResult);
    return userDetails.basket.courses[0];
  }

  return null;
}

module.exports = {
  AddCourseToBasket,
  AddProductToBasket,
  RemoveCourseInBasket,
  RemoveProductInBasket,
};
