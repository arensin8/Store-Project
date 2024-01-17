const { GraphQLObjectType, GraphQLSchema } = require("graphql");
const { BlogResolver } = require("./queries/blog.resolver");
const { ProductResolver } = require("./queries/product.resolver");
const { CategoryResolver, CategoryChildResolver } = require("./queries/category.resolver");

const RootQuery = new GraphQLObjectType({
  name: "RootQuery",
  fields: {
    blogs: BlogResolver,
    products: ProductResolver,
    categories: CategoryResolver,
    categoriesChildren : CategoryChildResolver
  },
});

const RootMutation = new GraphQLObjectType({
  name: "RootMutation",
  fields: {},
});

const graphQlSchema = new GraphQLSchema({
  query: RootQuery,
  //   mutation: RootMutation,
});

module.exports = {
  graphQlSchema,
};
