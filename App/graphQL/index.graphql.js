const { GraphQLObjectType, GraphQLSchema } = require("graphql");
const { BlogResolver } = require("./queries/blog.resolver");
const { ProductResolver } = require("./queries/product.resolver");
const {
  CategoryResolver,
  CategoryChildResolver,
} = require("./queries/category.resolver");
const {
  getUserBookmarkedBlogs,
  getUserBookmarkedProducts,
  getUserBookmarkedCourses,
  getUserBasket
} = require("./queries/user-profile.resolver");
const { CourseResolver } = require("./queries/course.resolver");
const {
  CreateCommentForBlog,
  CreateCommentForCourse,
  CreateCommentForProduct,
} = require("./mutations/comment.resolver");
const { LikeProduct ,LikeBlog , LikeCourse} = require("./mutations/likes.resolver");
const { DisLikeProduct , DisLikeBlog , DisLikeCourse} = require("./mutations/dislikes.resolver");
const { BookmarkProduct , BookmarkBlog , BookmarkCourse} = require("./mutations/bookmarks.resolver");
const { AddCourseToBasket , AddProductToBasket , RemoveCourseInBasket, RemoveProductInBasket} = require("./mutations/basket.resolver");

const RootQuery = new GraphQLObjectType({
  name: "RootQuery",
  fields: {
    blogs: BlogResolver,
    products: ProductResolver,
    categories: CategoryResolver,
    categoriesChildren: CategoryChildResolver,
    courses: CourseResolver,
    getUserBookmarkedBlogs,
    getUserBookmarkedCourses,
    getUserBookmarkedProducts,
    getUserBasket
  },
});

const RootMutation = new GraphQLObjectType({
  name: "RootMutation",
  fields: {
    CreateCommentForBlog,
    CreateCommentForCourse,
    CreateCommentForProduct,
    LikeProduct,
    LikeBlog,
    LikeCourse,
    DisLikeProduct,
    DisLikeBlog,
    DisLikeCourse,
    BookmarkBlog,
    BookmarkCourse,
    BookmarkProduct,
    AddCourseToBasket,
    AddProductToBasket,
    RemoveCourseInBasket,
    RemoveProductInBasket
  },
});

const graphQlSchema = new GraphQLSchema({
  query: RootQuery,
  mutation: RootMutation,
});

module.exports = {
  graphQlSchema,
};
