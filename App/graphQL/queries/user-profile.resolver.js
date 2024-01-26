const { GraphQLList, GraphQLString } = require("graphql");
const { BlogType } = require("../typeDefs/blog.type");
const { BlogsModel } = require("../../models/blogs");
const {
  verifyAccessTokenInGraphQL,
} = require("../../http/middlewares/verifyAccessToken");
const { ProductModel } = require("../../models/products");
const { CoursesModel } = require("../../models/course");
const { ProductType } = require("../typeDefs/product.type");
const { CourseType } = require("../typeDefs/course.type");

const getUserBookmarkedBlogs = {
  type: new GraphQLList(BlogType),
  resolve: async (_, args, context) => {
    const { req } = context;
    const user = await verifyAccessTokenInGraphQL(req);
    const blogs = await BlogsModel.find({ bookmarks: user._id }).populate([
      { path: "author" },
      { path: "category" },
      // { path: "comments.user" },
      // { path: "comments.answers.user" },
      { path: "likes" },
      { path: "dislikes" },
      { path: "bookmarks" },
    ]);
    return blogs;
  },
};

const getUserBookmarkedProducts = {
  type: new GraphQLList(ProductType),
  resolve: async (_, args, context) => {
    const { req } = context;
    const user = await verifyAccessTokenInGraphQL(req);
    const products = await ProductModel.find({ bookmarks: user._id }).populate([
      { path: "supplier" },
      { path: "category" },
      { path: "comments.user" },
      { path: "comments.answers.user" },
      { path: "likes" },
      { path: "dislikes" },
      { path: "bookmarks" },
    ]);
    return products;
  },
};

const getUserBookmarkedCourses = {
  type: new GraphQLList(CourseType),
  resolve: async (_, args, context) => {
    const { req } = context;
    const user = await verifyAccessTokenInGraphQL(req);
    const courses = await CoursesModel.find({ bookmarks: user._id }).populate([
      { path: "teacher" },
      { path: "category" },
      { path: "comments.user" },
      { path: "comments.answers.user" },
      { path: "likes" },
      { path: "dislikes" },
      { path: "bookmarks" },
    ]);
    return courses;
  },
};

module.exports = {
  getUserBookmarkedBlogs,
  getUserBookmarkedProducts,
  getUserBookmarkedCourses,
};
