const { GraphQLObjectType, GraphQLSchema } = require("graphql");
const { BlogResolver } = require("./queries/blog.resolver");
const { ProductResolver } = require("./queries/product.resolver");
const {
  CategoryResolver,
  CategoryChildResolver,
} = require("./queries/category.resolver");
const { CourseResolver } = require("./queries/course.resolver");
const {
  CreateCommentForBlog,
  CreateCommentForCourse,
  CreateCommentForProduct,
} = require("./mutations/comment.resolver");
const { LikeProduct ,LikeBlog , LikeCourse} = require("./mutations/likes.resolver");
const { DisLikeProduct , DisLikeBlog , DisLikeCourse} = require("./mutations/dislikes.resolver");
const { BookmarkProduct , BookmarkBlog , BookmarkCourse} = require("./mutations/bookmarks.resolver");

const RootQuery = new GraphQLObjectType({
  name: "RootQuery",
  fields: {
    blogs: BlogResolver,
    products: ProductResolver,
    categories: CategoryResolver,
    categoriesChildren: CategoryChildResolver,
    courses: CourseResolver,
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
  },
});

const graphQlSchema = new GraphQLSchema({
  query: RootQuery,
  mutation: RootMutation,
});

module.exports = {
  graphQlSchema,
};
