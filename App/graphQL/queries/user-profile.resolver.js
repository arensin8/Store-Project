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
const { AnyType } = require("../typeDefs/public.types");
const { UserModel } = require("../../models/users");

const getUserBookmarkedBlogs = {
  type: new GraphQLList(BlogType),
  resolve: async (_, args, context) => {
    const { req } = context;
    const user = await verifyAccessTokenInGraphQL(req);
    const blogs = await BlogsModel.find({ bookmarks: user._id }).populate([
      { path: "author" },
      { path: "category" },
      { path: "comments.user" },
      { path: "comments.answers.user" },
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

const getUserBasket = {
  type: AnyType,
  resolve: async (_, args, context) => {
    const { req } = context;
    const user = await verifyAccessTokenInGraphQL(req);
    const basketResult = await UserModel.aggregate([
      {
        $match: { _id: user._id },
      },
      {
        $project: { basket: 1 },
      },
      {
        $lookup: {
          from: "products",
          localField: "basket.products.productId",
          foreignField: "_id",
          as: "productDetails",
        },
      },
      {
        $lookup: {
          from: "courses",
          localField: "basket.courses.courseId",
          foreignField: "_id",
          as: "courseDetails",
        },
      },
      { $unwind: "$productDetails" },
      { $unwind: "$courseDetails" },
      // {
      //   $addFields: {
      //     "productDetails" : {
      //       $function: {
      //         body: function (productDetails, products) {
      //           productDetails.map(function (product) {
      //             return {
      //               ...productDetails,
      //               basketCount: products.find(
      //                 (item) => item.productId,
      //                 valueOf() == product._id.valueOf()
      //               ).count,
      //               totalPrice:
      //                 products.find(
      //                   (item) => item.productId,
      //                   valueOf() == product._id.valueOf()
      //                 ).count * price,
      //             };
      //           });
      //         },
      //         args: ["$productDetails", "$basket.products"],
      //         lang: "js",
      //       },
      //     },
      //   },
      // },
      {
        $addFields: {
          productDetails: {
            $map: {
              input: { $objectToArray: "$productDetails" },
              as: "product",
              in: {
                _id: "$$product.v._id",
                name: "$$product.v.name",
                // Add other fields as needed
                basketCount: {
                  $let: {
                    vars: {
                      countObj: {
                        $arrayElemAt: [
                          {
                            $filter: {
                              input: "$basket.products",
                              as: "basketProduct",
                              cond: {
                                $eq: [
                                  "$$basketProduct.productId",
                                  "$$product.v._id",
                                ],
                              },
                            },
                          },
                          0,
                        ],
                      },
                    },
                    in: "$$countObj.count",
                  },
                },
                totalPrice: {
                  $multiply: [
                    {
                      $let: {
                        vars: {
                          countObj: {
                            $arrayElemAt: [
                              {
                                $filter: {
                                  input: "$basket.products",
                                  as: "basketProduct",
                                  cond: {
                                    $eq: [
                                      "$$basketProduct.productId",
                                      "$$product.v._id",
                                    ],
                                  },
                                },
                              },
                              0,
                            ],
                          },
                        },
                        in: "$$countObj.count",
                      },
                    },
                    "$$product.v.price", // Replace with the actual field that stores the price
                  ],
                },
              },
            },
          },
        },
      },

      { $project: { basket: 0 } },
    ]);
    return basketResult;
  },
};

module.exports = {
  getUserBookmarkedBlogs,
  getUserBookmarkedProducts,
  getUserBookmarkedCourses,
  getUserBasket,
};
