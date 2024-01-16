const {
  GraphQLObjectType,
  GraphQLSchema,
} = require("graphql");
const { BlogResolver } = require("./queries/blog.resolver");

const RootQuery = new GraphQLObjectType({
  name: "RootQuery",
  fields: {
    blogs: BlogResolver
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
