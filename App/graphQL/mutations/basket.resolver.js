const {  GraphQLString, GraphQLInt } = require("graphql");

const { ProductModel } = require("../../models/products");
const { ResponseType } = require("../typeDefs/public.types");
const { StatusCodes } = require("http-status-codes");
const {
  checkExistsProduct,
  checkExistsCourse,
} = require("../utils.graphql");

const AddProductToBasket = {
  type: ResponseType,
  args: {
    productId: { type: GraphQLString },
    count: { type: GraphQLInt },
  },
  resolve: async (_, args, context) => {
    const { req } = context;
    const { productId, count } = args;
    await checkExistsProduct(productId);
  },
};

const AddCourseToBasket = {
  type: ResponseType,
  args: { 
    courseId: { type: GraphQLString },
   count: { type: GraphQLInt } 
  },
  resolve: async (_, args, context) => {
    const { req } = context;
    const { courseId , count } = args;
    await checkExistsCourse(courseId);
  },
};

const RemoveProductToBasket = {
  type: ResponseType,
  args: { 
    courseId: { type: GraphQLString }
  },
  resolve: async (_, args, context) => {
    const { req } = context;
    const { courseId  } = args;
    await checkExistsProduct(courseId);
  },
};

const RemoveCourseToBasket = {
  type: ResponseType,
  args: { 
    courseId: { type: GraphQLString }
  },
  resolve: async (_, args, context) => {
    const { req } = context;
    const { courseId  } = args;
    await checkExistsCourse(courseId);
  },
};

module.exports = {
  AddCourseToBasket,
  AddProductToBasket,
  RemoveCourseToBasket,
  RemoveProductToBasket
};
