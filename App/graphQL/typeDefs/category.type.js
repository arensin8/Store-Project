const { GraphQLObjectType, GraphQLString, GraphQLList } = require("graphql");

const CategoryType = new GraphQLObjectType({
  name: "CategoryType",
  fields: {
    _id: { type: GraphQLString },
    title: { type: GraphQLString },
  },
});

module.exports = {
  CategoryType,
};
